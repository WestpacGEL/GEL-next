import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#534891';
const POP = '#A094FC';

export const theme: BrandConfig = {
  code: 'BOM',
  colors: {
    ...generateColorTints({
      background: '#F7F7F7',
      border: '#D4D4D8',
      borderDark: '#939299',
      focus: '#867BCD',
      heading: '#534891',
      hero: HERO,
      light: '#FBFBFD',
      link: '#D13900',
      muted: '#6E6C7A',
      neutral: '#595762',
      pop: POP,
      primary: '#D13900',
      text: '#20024E',
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: POP,
        outline: HERO,
      },
    },
  },
  brandFont: 'Brown Pro',
  name: 'Bank of Melbourne',
};
