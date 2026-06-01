import type { Transaction } from '../types';
import { mockData } from './mockData';

export { mockData };

interface PayPalTransactionDetail {
  transaction_info: {
    transaction_id: string;
    transaction_date: string;
    transaction_amount: { value: string; currency_code: string };
    transaction_note?: string;
    transaction_subject?: string;
  };
  payer_info?: {
    payer_name?: {
      full_name?: string;
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
  };
}

function extractSenderName(detail: PayPalTransactionDetail): string {
  const payer = detail.payer_info;
  if (!payer) return 'Anonymous';
  const name = payer.payer_name;
  if (name?.full_name) return name.full_name;
  const parts = [name?.given_name, name?.surname].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return payer.email_address ?? 'Anonymous';
}

export function parsePayPalResponse(raw: unknown): Transaction[] {
  if (!raw || typeof raw !== 'object') return [];
  const data = raw as Record<string, unknown>;

  // PayPal Reporting API format
  if (Array.isArray(data['transaction_details'])) {
    return (data['transaction_details'] as PayPalTransactionDetail[])
      .map(detail => ({
        id: detail.transaction_info.transaction_id,
        senderName: extractSenderName(detail),
        message: detail.transaction_info.transaction_note
          || detail.transaction_info.transaction_subject
          || '',
        amount: parseFloat(detail.transaction_info.transaction_amount.value),
        currency: detail.transaction_info.transaction_amount.currency_code,
        date: detail.transaction_info.transaction_date.slice(0, 10),
      }))
      .filter(tx => tx.message.trim().length > 0);
  }

  // Simplified flat array format
  if (Array.isArray(raw)) {
    return raw as Transaction[];
  }

  // { transactions: [...] } envelope
  if (Array.isArray(data['transactions'])) {
    return data['transactions'] as Transaction[];
  }

  return [];
}

export async function loadTransactionsFromFile(): Promise<Transaction[] | null> {
  try {
    const res = await fetch('/data/transactions.json');
    if (!res.ok) return null;
    const raw = await res.json();
    const parsed = parsePayPalResponse(raw);
    return parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}
