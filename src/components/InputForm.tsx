import type { FormState, Language, PDFLanguage } from '../types';
import { t } from '../i18n';
import { ThemePicker } from './ThemePicker';

interface Props {
  formState: FormState;
  onChange: (state: FormState) => void;
  lang: Language;
}

export function InputForm({ formState, onChange, lang }: Props) {
  const set = <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => onChange({ ...formState, [key]: value });

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('themeLabel', lang)}
        </label>
        <ThemePicker
          value={formState.theme}
          onChange={set('theme')}
          lang={lang}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('recipientLabel', lang)}
        </label>
        <input
          type="text"
          value={formState.recipientName}
          onChange={e => set('recipientName')(e.target.value)}
          placeholder={t('recipientPlaceholder', lang)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('startDateLabel', lang)}
          </label>
          <input
            type="date"
            value={formState.startDate}
            onChange={e => set('startDate')(e.target.value)}
            max={formState.endDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('endDateLabel', lang)}
          </label>
          <input
            type="date"
            value={formState.endDate}
            onChange={e => set('endDate')(e.target.value)}
            min={formState.startDate || undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('pdfLanguageLabel', lang)}
        </label>
        <select
          value={formState.pdfLanguage}
          onChange={e => set('pdfLanguage')(e.target.value as PDFLanguage)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="en">{t('pdfLangEn', lang)}</option>
          <option value="fr">{t('pdfLangFr', lang)}</option>
          <option value="both">{t('pdfLangBoth', lang)}</option>
        </select>
      </div>
    </div>
  );
}
