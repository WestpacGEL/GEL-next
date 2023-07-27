import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const theme: BrandConfig = {
  code: 'WBC',
  colors: generateColorTints({
    background: '#F3F4F6',
    border: '#DEDEE1',
    borderDark: '#9390A2',
    focus: '#B978D9',
    heading: '#1F1C4F',
    hero: '#1F1C4F',
    light: '#F9F9FB',
    link: '#DA1710',
    muted: '#595767',
    neutral: '#2A2E42',
    pop: '#FF3DDB', //Bright Pink
    primary: '#DA1710',
    text: '#181B25',
  }),
  brandFont: 'Westpac',
  name: 'Westpac',
};
