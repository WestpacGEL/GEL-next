import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const theme: BrandConfig = {
  code: 'BOM',
  colors: generateColorTints({
    background: '#F7F7F7',
    border: '#D4D4D8',
    borderDark: '#939299',
    focus: '#867BCD',
    heading: '#534891',
    hero: '#534891',
    light: '#FBFBFD',
    link: '#D13900',
    muted: '#6E6C7A',
    neutral: '#595762',
    pop: '#A094FC',
    primary: '#D13900',
    text: '#20024E',
  }),
  brandFont: 'Brown Pro',
  name: 'Bank of Melbourne',
};
