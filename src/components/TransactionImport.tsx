import { useState, useRef } from 'react';
import clsx from 'clsx';
import type { FormState, Transaction, Language } from '../types';
import { t } from '../i18n';
import { parsePayPalResponse } from '../lib/transactions';

interface Props {
  formState: FormState;
  lang: Language;
  dataSource: 'mock' | 'real';
  onImport: (transactions: Transaction[]) => void;
  onReloadFromFile: () => void;
}

export function TransactionImport({ formState, lang, dataSource, onImport, onReloadFromFile }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const claudePrompt =
    `Fetch PayPal transactions from ${formState.startDate || 'START_DATE'} to ${formState.endDate || 'END_DATE'} ` +
    `using the PayPal MCP list_transaction tool, then save the result as JSON to public/data/transactions.json in this project.`;

  function copyPrompt() {
    navigator.clipboard.writeText(claudePrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleImport() {
    try {
      const raw = JSON.parse(jsonText);
      const txns = parsePayPalResponse(raw);
      if (txns.length === 0) {
        setError(t('importError', lang));
        return;
      }
      onImport(txns);
      setShowModal(false);
      setJsonText('');
      setError('');
    } catch {
      setError(t('importError', lang));
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const raw = JSON.parse(evt.target?.result as string);
        const txns = parsePayPalResponse(raw);
        if (txns.length > 0) {
          onImport(txns);
        } else {
          setError(t('importError', lang));
        }
      } catch {
        setError(t('importError', lang));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="mt-6 pt-5 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">{t('dataSourceLabel', lang)}</span>
        <span
          className={clsx(
            'text-xs px-2 py-0.5 rounded-full font-medium',
            dataSource === 'mock'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700',
          )}
        >
          {dataSource === 'mock' ? t('usingMockData', lang) : t('usingRealData', lang)}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={copyPrompt}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>{copied ? '✓' : '📋'}</span>
          <span>{copied ? t('copied', lang) : t('copyClaudePrompt', lang)}</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('pasteJSON', lang)}
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('uploadJSON', lang)}
          </button>

          <button
            onClick={onReloadFromFile}
            className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            title="Reload from public/data/transactions.json"
          >
            ↺
          </button>
        </div>
      </div>

      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileUpload} />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">{t('importTitle', lang)}</h3>
              <p className="text-xs text-gray-500 mt-1">{t('importInstructions', lang)}</p>
            </div>
            <div className="p-5">
              <textarea
                value={jsonText}
                onChange={e => { setJsonText(e.target.value); setError(''); }}
                placeholder='{ "transaction_details": [...] }'
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>
            <div className="p-5 pt-0 flex gap-3 justify-end">
              <button
                onClick={() => { setShowModal(false); setJsonText(''); setError(''); }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('importCancel', lang)}
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('importConfirm', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
