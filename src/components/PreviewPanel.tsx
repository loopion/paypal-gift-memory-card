import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import type { FormState, Transaction, ThemeConfig, Language } from '../types';
import { GiftMemoryBookPDF } from '../pdf/GiftMemoryBookPDF';
import { t } from '../i18n';

interface Props {
  formState: FormState;
  transactions: Transaction[];
  theme: ThemeConfig;
  lang: Language;
  dataSource: 'mock' | 'real';
}

const filename = (recipientName: string) =>
  `gift-memory-book-${(recipientName || 'gift').replace(/\s+/g, '-').toLowerCase()}.pdf`;

export function PreviewPanel({ formState, transactions, theme, lang, dataSource }: Props) {
  const pdfProps = { formState, transactions, theme };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{
              backgroundColor: dataSource === 'mock' ? '#FEF3C7' : '#D1FAE5',
              color: dataSource === 'mock' ? '#92400E' : '#065F46',
            }}
          >
            {dataSource === 'mock' ? t('usingMockData', lang) : t('usingRealData', lang)}
          </span>
          <span className="text-xs text-gray-400 truncate">
            {transactions.length} contribution{transactions.length !== 1 ? 's' : ''}
          </span>
        </div>

        <PDFDownloadLink
          document={<GiftMemoryBookPDF {...pdfProps} />}
          fileName={filename(formState.recipientName)}
          className="flex-shrink-0"
        >
          {({ loading }) => (
            <button
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors disabled:opacity-60"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <span>{loading ? '…' : '↓'}</span>
              <span>{loading ? t('preparingPDF', lang) : t('downloadPDF', lang)}</span>
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="flex-1 overflow-hidden bg-gray-100">
        <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
          <GiftMemoryBookPDF {...pdfProps} />
        </PDFViewer>
      </div>
    </div>
  );
}
