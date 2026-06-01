import { Font } from '@react-pdf/renderer';

let registered = false;

export function registerFonts(): void {
  if (registered) return;
  registered = true;

  Font.register({ family: 'Playfair Display', src: '/fonts/PlayfairDisplay-Regular.woff' });
  Font.register({ family: 'Nunito', src: '/fonts/Nunito-Regular.woff' });
  Font.register({ family: 'Baloo 2', src: '/fonts/Baloo2-Regular.woff' });

  Font.registerHyphenationCallback(word => [word]);
}
