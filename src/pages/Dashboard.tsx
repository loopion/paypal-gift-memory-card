import { useState, useMemo, useEffect } from 'react';
import type { FormState, Language, Transaction } from '../types';
import { themes } from '../themes';
import { mockData } from '../lib/mockData';
import { filterByDateRange } from '../lib/filters';
import { t } from '../i18n';
import { InputForm } from '../components/InputForm';
import { PreviewPanel } from '../components/PreviewPanel';
import { LanguageToggle } from '../components/LanguageToggle';
import { useSession } from '../hooks/useSession';
import { fetchActivity } from '../lib/activityClient';
import type { ActivitySource } from '../lib/activityClient';

const DEFAULT_FORM: FormState = {
  theme: 'wedding',
  recipientName: '',
  startDate: '',
  endDate: '',
  pdfLanguage: 'en',
};

export default function Dashboard() {
  const { user, signOut } = useSession();
  const [lang, setLang] = useState<Language>('en');
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(mockData);
  const [activitySource, setActivitySource] = useState<ActivitySource>('sample');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () => filterByDateRange(allTransactions, formState.startDate, formState.endDate),
    [allTransactions, formState.startDate, formState.endDate],
  );

  const theme = themes[formState.theme];

  async function loadActivity() {
    setLoading(true);
    setFetchError(null);
    try {
      const { transactions, source } = await fetchActivity(
        formState.startDate,
        formState.endDate,
      );
      setAllTransactions(transactions);
      setActivitySource(source);
    } catch (err) {
      setFetchError('Could not load activity — showing sample data.');
      setAllTransactions(mockData);
      setActivitySource('sample');
    } finally {
      setLoading(false);
    }
  }

  // Auto-load when date range changes
  useEffect(() => {
    if (formState.startDate || formState.endDate) {
      loadActivity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.startDate, formState.endDate]);

  const dataSource: 'mock' | 'real' = activitySource === 'internal' ? 'real' : 'mock';

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#EDF0F2] px-5 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#008CFF] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M10 2.5C10 4.7 8.4 6.5 6.5 6.5H4.5L3.5 11H1.5L3.5 2H7C8.7 2 10 2.5 10 2.5Z" fill="white" opacity="0.6"/>
                <path d="M12 4C12 6.2 10.4 8 8.5 8H6.5L5.5 12.5H3.5L5.5 3.5H9.5C11.2 3.5 12 4 12 4Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[#09090B] leading-tight">{t('appTitle', lang)}</h1>
              <p className="text-xs text-[#949494] leading-tight hidden sm:block">{t('appSubtitle', lang)}</p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Fallback banner */}
          {activitySource === 'fallback' && (
            <span className="hidden md:block text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Sample data — internal API unreachable
            </span>
          )}
          {fetchError && (
            <span className="hidden md:block text-xs text-red-500">{fetchError}</span>
          )}

          <LanguageToggle lang={lang} onChange={setLang} />

          {/* User info + sign out */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-[#09090B]">{user.name}</p>
                <p className="text-xs text-[#949494]">{user.email}</p>
              </div>
              <button
                onClick={signOut}
                className="text-xs text-[#696969] hover:text-[#09090B] border border-[#E6E7E8]
                  hover:border-[#BFBFBF] rounded-lg px-3 py-1.5 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="lg:w-80 xl:w-96 flex-shrink-0 bg-white border-r border-[#EDF0F2] overflow-y-auto">
          <div className="p-5">
            <InputForm formState={formState} onChange={setFormState} lang={lang} />

            {/* Activity controls */}
            <div className="mt-5 pt-5 border-t border-[#EDF0F2]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#09090B]">
                  {lang === 'fr' ? 'Activité PayPal' : 'PayPal Activity'}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: activitySource === 'internal' ? '#D1FAE5' : '#FEF3C7',
                    color: activitySource === 'internal' ? '#065F46' : '#92400E',
                  }}
                >
                  {activitySource === 'internal'
                    ? (lang === 'fr' ? 'Données réelles' : 'Live data')
                    : (lang === 'fr' ? 'Données exemple' : 'Sample data')}
                </span>
              </div>
              <button
                onClick={loadActivity}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                  border border-[#E6E7E8] hover:border-[#008CFF] text-sm font-medium
                  text-[#09090B] hover:text-[#008CFF] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#008CFF] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M12 7A5 5 0 1 1 7 2M12 7V3M12 3H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {lang === 'fr' ? 'Actualiser les contributions' : 'Refresh contributions'}
              </button>
              <p className="mt-2 text-xs text-[#949494]">
                {lang === 'fr'
                  ? 'Récupère les paiements personnels avec un message.'
                  : 'Fetches personal payments with a note, filtered by date range.'}
              </p>
            </div>
          </div>
        </aside>

        {/* Preview */}
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
