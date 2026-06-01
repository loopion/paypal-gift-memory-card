export type Theme = 'wedding' | 'birthday' | 'baby';
export type Language = 'en' | 'fr';
export type PDFLanguage = 'en' | 'fr' | 'both';

export interface Transaction {
  id: string;
  senderName: string;
  message: string;
  amount: number;
  currency: string;
  date: string; // "YYYY-MM-DD"
}

export interface FormState {
  theme: Theme;
  recipientName: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
  pdfLanguage: PDFLanguage;
}

export interface ThemeConfig {
  id: Theme;
  emoji: string;
  labelKey: 'themeWedding' | 'themeBirthday' | 'themeBaby';
  colors: {
    bg: string;
    accent: string;
    text: string;
    card: string;
    cardBorder: string;
    muted: string;
  };
  fontFamily: string;
}
