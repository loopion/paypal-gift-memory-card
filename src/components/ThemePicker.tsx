import clsx from 'clsx';
import type { Theme, Language } from '../types';
import { themes } from '../themes';
import { t } from '../i18n';

interface Props {
  value: Theme;
  onChange: (theme: Theme) => void;
  lang: Language;
}

const themeList: Theme[] = ['wedding', 'birthday', 'baby'];

export function ThemePicker({ value, onChange, lang }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {themeList.map(id => {
        const theme = themes[id];
        const selected = value === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx(
              'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-150 cursor-pointer text-left',
              selected
                ? 'border-current shadow-md scale-105'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
            )}
            style={selected ? { backgroundColor: theme.colors.bg, borderColor: theme.colors.accent } : {}}
          >
            <span className="text-xl">{theme.emoji}</span>
            <span
              className={clsx('text-xs font-semibold text-center leading-tight', !selected && 'text-gray-700')}
              style={selected ? { color: theme.colors.text } : {}}
            >
              {t(theme.labelKey, lang)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
