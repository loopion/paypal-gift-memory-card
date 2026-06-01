import crypto from 'crypto';
import type { Transaction } from './sampleData.js';

const API_BASE = process.env.PAYPAL_API_BASE ?? 'https://api.paypal.com';
const OAUTH_BASE = process.env.PAYPAL_OAUTH_BASE ?? 'https://www.paypal.com';
const INTERNAL_BASE = process.env.INTERNAL_ACTIVITY_BASE;
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';
const REDIRECT_URI = process.env.PAYPAL_REDIRECT_URI ?? 'http://localhost:5173/api/auth/callback';

export function generatePKCE(): { state: string; verifier: string; challenge: string } {
  const state = crypto.randomBytes(16).toString('base64url');
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  return { state, verifier, challenge };
}

export function buildAuthorizationUrl(state: string, challenge: string): string {
  const params = new URLSearchParams({
    flowEntry: 'static',
    client_id: CLIENT_ID,
    response_type: 'code',
    scope: 'openid profile email',
    redirect_uri: REDIRECT_URI,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });
  return `${OAUTH_BASE}/connect?${params.toString()}`;
}

export async function exchangeCode(
  code: string,
  verifier: string,
): Promise<{ accessToken: string; expiresAt: number }> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${text}`);
  }
  const data = await res.json() as { access_token: string; expires_in: number };
  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}

export async function getUserInfo(
  accessToken: string,
): Promise<{ name: string; email: string; payerId: string }> {
  const res = await fetch(`${API_BASE}/v1/identity/oauth2/userinfo?schema=openid`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Userinfo failed (${res.status})`);
  const data = await res.json() as {
    name?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    payer_id?: string;
  };
  const name =
    data.name ??
    [data.given_name, data.family_name].filter(Boolean).join(' ') ??
    'PayPal User';
  return {
    name,
    email: data.email ?? '',
    payerId: data.payer_id ?? '',
  };
}

interface ActivityDetail {
  id: string;
  counterparty?: {
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  amount?: { gross?: { value?: string; currency_code?: string } };
  time?: { created?: string };
  message?: { notes?: string; custom_note?: string };
  debit_credit_code?: string;
  payment_purpose?: string;
  channels?: string[];
}

function mapActivityDetail(detail: ActivityDetail): Transaction | null {
  if (detail.debit_credit_code !== 'CREDIT') return null;
  // Accept personal payments (by purpose or by channel)
  const isPersonal =
    detail.payment_purpose === 'PERSONAL' ||
    (detail.channels ?? []).includes('PERSONAL_PAYMENT');
  if (!isPersonal) return null;
  const message = detail.message?.notes ?? detail.message?.custom_note ?? '';
  if (!message.trim()) return null;
  const senderName =
    detail.counterparty?.name ??
    [detail.counterparty?.first_name, detail.counterparty?.last_name]
      .filter(Boolean)
      .join(' ') ??
    'Anonymous';
  return {
    id: detail.id,
    senderName,
    message,
    amount: parseFloat(detail.amount?.gross?.value ?? '0'),
    currency: detail.amount?.gross?.currency_code ?? 'USD',
    date: (detail.time?.created ?? '').slice(0, 10),
  };
}

export async function fetchActivityList(
  payerId: string,
  start: string,
  end: string,
  accessToken: string,
): Promise<Transaction[]> {
  if (!INTERNAL_BASE) {
    throw new Error('INTERNAL_ACTIVITY_BASE not configured');
  }

  // TODO: replace with real ActivitySearchSpecification endpoint once spec is available
  // Expected: GET {INTERNAL_BASE}/v1/payments/activity-search?start_date={start}&end_date={end}&account_id={payerId}
  // Returns: { activity_ids: string[] }
  const searchUrl = `${INTERNAL_BASE}/v1/payments/activity-search?start_date=${start}&end_date=${end}&account_id=${payerId}`;
  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!searchRes.ok) throw new Error(`Activity search failed (${searchRes.status})`);
  const searchData = await searchRes.json() as { activity_ids?: string[] };
  const ids = searchData.activity_ids ?? [];

  // Fan-out with concurrency limit of 8
  const results: Transaction[] = [];
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 8) chunks.push(ids.slice(i, i + 8));

  for (const chunk of chunks) {
    const details = await Promise.all(
      chunk.map(async (id) => {
        const r = await fetch(`${INTERNAL_BASE}/v1/payments/activities/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!r.ok) return null;
        return r.json() as Promise<ActivityDetail>;
      }),
    );
    for (const d of details) {
      if (!d) continue;
      const tx = mapActivityDetail(d);
      if (tx) results.push(tx);
    }
  }
  return results;
}
