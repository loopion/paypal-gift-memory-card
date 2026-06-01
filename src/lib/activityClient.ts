import type { Transaction } from '../types';

export type ActivitySource = 'sample' | 'internal' | 'fallback';

interface ActivityResponse {
  transactions: Transaction[];
}

export async function fetchActivity(
  startDate: string,
  endDate: string,
): Promise<{ transactions: Transaction[]; source: ActivitySource }> {
  const params = new URLSearchParams();
  if (startDate) params.set('start', startDate);
  if (endDate) params.set('end', endDate);

  const res = await fetch(`/api/activity?${params.toString()}`, { credentials: 'include' });
  const source = (res.headers.get('X-Activity-Source') ?? 'sample') as ActivitySource;
  if (!res.ok) throw new Error(`Activity fetch failed: ${res.status}`);
  const data: ActivityResponse = await res.json();
  return { transactions: data.transactions, source };
}
