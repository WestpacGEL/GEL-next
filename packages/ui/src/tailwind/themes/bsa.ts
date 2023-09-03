import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#002F6C';
const POP = '#00ADBD'; //Bight

export const theme: BrandConfig = {
  code: 'BSA',
  colors: {
    ...generateColorTints({
      background: '#F3F4F4',
      border: '#D3D4D5',
      borderDark: '#909396',
      focus: '#C26F9D',
      heading: '#002F6C',
      hero: HERO,
      light: '#FAFAFA',
      link: '#D81B2B',
      muted: '#6A6E72',
      neutral: '#6A6E72',
      pop: POP,
      primary: '#D81B2B',
      text: '#333',
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: POP,
        outline: HERO,
      },
    },
  },

  brandFont: 'Aller',
  name: 'BankSA',
};
