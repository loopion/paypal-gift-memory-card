import { useState, useMemo } from 'react';
import type { FormState, Language, Transaction } from './types';
import { themes } from './themes';
import { mockData, loadTransactionsFromFile } from './lib/transactions';
import { filterByDateRange } from './lib/filters';
import { t } from './i18n';
import { InputForm } from './components/InputForm';
import { TransactionImport } from './components/TransactionImport';
import { PreviewPanel } from './components/PreviewPanel';
import { LanguageToggle } from './components/LanguageToggle';

const DEFAULT_FORM: FormState = {
  theme: 'wedding',
  recipientName: '',
  startDate: '',
  endDate: '',
  pdfLanguage: 'en',
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(mockData);
  const [dataSource, setDataSource] = useState<'mock' | 'real'>('mock');

  const filtered = useMemo(
    () => filterByDateRange(allTransactions, formState.startDate, formState.endDate),
    [allTransactions, formState.startDate, formState.endDate],
  );

  const theme = themes[formState.theme];

  function handleImport(txns: Transaction[]) {
    setAllTransactions(txns);
    setDataSource('real');
  }

  async function handleReloadFromFile() {
    const txns = await loadTransactionsFromFile();
    if (txns) {
      setAllTransactions(txns);
      setDataSource('real');
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-lg">{theme.emoji}</span>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">{t('appTitle', lang)}</h1>
            <p className="text-xs text-gray-500 leading-tight hidden sm:block">{t('appSubtitle', lang)}</p>
          </div>
        </div>
        <LanguageToggle lang={lang} onChange={setLang} />
      </header>

      <main className="flex flex-col lg:flex-row flex-1 min-h-0">
        <aside className="lg:w-80 xl:w-96 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-5">
            <InputForm formState={formState} onChange={setFormState} lang={lang} />
            <TransactionImport
              formState={formState}
              lang={lang}
              dataSource={dataSource}
              onImport={handleImport}
              onReloadFromFile={handleReloadFromFile}
            />
          </div>
        </aside>

        <section className="flex-1 min-h-0 min-w-0">
          <PreviewPanel
            formState={formState}
            transactions={filtered}
            theme={theme}
            lang={lang}
            dataSource={dataSource}
          />
        </section>
      </main>
    </div>
  );
}
