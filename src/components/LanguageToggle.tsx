import type { Language } from '../types';
import clsx from 'clsx';

interface Props {
  lang: Language;
  onChange: (lang: Language) => void;
}

export function LanguageToggle({ lang, onChange }: Props) {
  return (
    <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
      {(['en', 'fr'] as Language[]).map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={clsx(
            'px-3 py-1.5 text-sm font-medium transition-colors',
            lang === l
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700',
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
