import type { Theme, ThemeConfig } from '../types';
import { weddingTheme } from './wedding';
import { birthdayTheme } from './birthday';
import { babyTheme } from './baby';

export const themes: Record<Theme, ThemeConfig> = {
  wedding: weddingTheme,
  birthday: birthdayTheme,
  baby: babyTheme,
};

export { weddingTheme, birthdayTheme, babyTheme };
