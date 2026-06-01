import { Page, View, Text } from '@react-pdf/renderer';
import type { Transaction, ThemeConfig, Language, PDFLanguage } from '../types';
import { createStyles } from './styles';
import { t } from '../i18n';
import { totalAmount, formatAmount } from '../lib/filters';

interface Props {
  theme: ThemeConfig;
  transactions: Transaction[];
  lang: Language | PDFLanguage;
}

export function SummaryPage({ theme, transactions, lang }: Props) {
  const s = createStyles(theme);
  const total = totalAmount(transactions);
  const currency = transactions[0]?.currency ?? 'EUR';
  const formattedTotal = formatAmount(total, currency);

  return (
    <Page size="A4" style={s.summaryPage}>
      <Text style={s.summaryTitle}>{t('summaryTitle', lang)}</Text>

      <View style={s.summaryCard}>
        <View style={s.summaryStatRow}>
          <Text style={s.summaryStatNumber}>{transactions.length}</Text>
          <Text style={s.summaryStatLabel}>
            {transactions.length === 1
              ? t('summaryContributors', lang).replace(/s$/, '')
              : t('summaryContributors', lang)}
          </Text>
        </View>

        <View style={s.summaryStatRow}>
          <Text style={s.summaryStatNumber}>{transactions.length}</Text>
          <Text style={s.summaryStatLabel}>{t('summaryMessages', lang)}</Text>
        </View>

        <View style={s.summaryDivider} />

        <Text style={s.summaryTotal}>{t('summaryTotal', lang)}</Text>
        <Text style={s.summaryTotalAmount}>{formattedTotal}</Text>
      </View>

      <Text style={s.summaryThankYou}>{t('summaryThankYou', lang)}</Text>
    </Page>
  );
}
