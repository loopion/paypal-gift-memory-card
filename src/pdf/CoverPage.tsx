import { Page, View, Text } from '@react-pdf/renderer';
import type { ThemeConfig, Language, PDFLanguage } from '../types';
import { createStyles } from './styles';
import { t } from '../i18n';
import { formatDate } from '../lib/filters';

interface Props {
  theme: ThemeConfig;
  recipientName: string;
  startDate: string;
  endDate: string;
  lang: Language | PDFLanguage;
}

export function CoverPage({ theme, recipientName, startDate, endDate, lang }: Props) {
  const s = createStyles(theme);
  const displayLang: Language = lang === 'both' ? 'en' : lang as Language;
  const dateStart = startDate ? formatDate(startDate, displayLang) : '';
  const dateEnd = endDate ? formatDate(endDate, displayLang) : '';

  return (
    <Page size="A4" style={s.coverPage}>
      <View style={s.coverFrame}>
        <Text style={s.coverTitle}>{t('coverTitle', lang)}</Text>
        <View style={s.coverDivider} />
        <Text style={s.coverForLabel}>{t('coverFor', lang)}</Text>
        <Text style={s.coverRecipient}>{recipientName || '—'}</Text>
        {(dateStart || dateEnd) && (
          <>
            <Text style={s.coverPeriodLabel}>{t('coverPeriod', lang)}</Text>
            <Text style={s.coverDateRange}>
              {dateStart}
              {dateStart && dateEnd ? ` ${t('coverAnd', lang)} ` : ''}
              {dateEnd}
            </Text>
          </>
        )}
      </View>
    </Page>
  );
}
