import type { Transaction, Language } from '../types';

export function filterByDateRange(
  transactions: Transaction[],
  startDate: string,
  endDate: string,
): Transaction[] {
  return transactions.filter(tx => {
    if (startDate && tx.date < startDate) return false;
    if (endDate && tx.date > endDate) return false;
    return true;
  });
}

export function sortByDate(transactions: Transaction[], direction: 'asc' | 'desc' = 'asc'): Transaction[] {
  return [...transactions].sort((a, b) => {
    const cmp = a.date.localeCompare(b.date);
    return direction === 'asc' ? cmp : -cmp;
  });
}

export function totalAmount(transactions: Transaction[]): number {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}

export function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount);
}

export function formatDate(dateStr: string, lang: Language): string {
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
