import { View, Text } from '@react-pdf/renderer';
import type { Transaction, ThemeConfig, Language, PDFLanguage } from '../types';
import { createStyles } from './styles';
import { t } from '../i18n';
import { formatDate } from '../lib/filters';

interface Props {
  transaction: Transaction;
  theme: ThemeConfig;
  lang: Language | PDFLanguage;
}

export function ContributionCard({ transaction, theme, lang }: Props) {
  const s = createStyles(theme);
  const displayLang: Language = lang === 'both' ? 'en' : lang as Language;
  const formattedDate = transaction.date
    ? formatDate(transaction.date, displayLang)
    : t('noDate', lang);

  return (
    <View style={s.cardContainer}>
      <View style={s.cardHeader}>
        <View>
          <Text style={s.cardSenderLabel}>{t('withLoveFrom', lang)}</Text>
          <Text style={s.cardSenderName}>{transaction.senderName}</Text>
        </View>
        <Text style={s.cardDate}>{formattedDate}</Text>
      </View>
      <View style={s.cardDivider} />
      <Text style={s.cardMessage}>{`"${transaction.message}"`}</Text>
    </View>
  );
}
