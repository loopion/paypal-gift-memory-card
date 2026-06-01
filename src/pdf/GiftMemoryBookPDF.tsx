import { Document, Page, View } from '@react-pdf/renderer';
import type { FormState, Transaction, ThemeConfig, Language } from '../types';
import { registerFonts } from './fonts';
import { createStyles } from './styles';
import { CoverPage } from './CoverPage';
import { ContributionCard } from './ContributionCard';
import { SummaryPage } from './SummaryPage';

registerFonts();

interface Props {
  formState: FormState;
  transactions: Transaction[];
  theme: ThemeConfig;
}

const CARDS_PER_PAGE = 3;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function renderSection(
  lang: Language,
  formState: FormState,
  transactions: Transaction[],
  theme: ThemeConfig,
) {
  const s = createStyles(theme);
  const pages = chunkArray(transactions, CARDS_PER_PAGE);

  return [
    <CoverPage
      key={`cover-${lang}`}
      theme={theme}
      recipientName={formState.recipientName}
      startDate={formState.startDate}
      endDate={formState.endDate}
      lang={lang}
    />,
    ...pages.map((chunk, idx) => (
      <Page key={`page-${lang}-${idx}`} size="A4" style={s.contentPage}>
        {chunk.map(tx => (
          <ContributionCard key={tx.id} transaction={tx} theme={theme} lang={lang} />
        ))}
        <View style={s.pageNumber} fixed>
        </View>
      </Page>
    )),
    <SummaryPage
      key={`summary-${lang}`}
      theme={theme}
      transactions={transactions}
      lang={lang}
    />,
  ];
}

export function GiftMemoryBookPDF({ formState, transactions, theme }: Props) {
  const { pdfLanguage, recipientName } = formState;
  const langs: Language[] = pdfLanguage === 'both' ? ['en', 'fr'] : [pdfLanguage as Language];

  return (
    <Document
      title={`Gift Memory Book — ${recipientName || 'Gift'}`}
      author="PayPal Gift Memory Book"
    >
      {langs.flatMap(lang => renderSection(lang, formState, transactions, theme))}
    </Document>
  );
}
