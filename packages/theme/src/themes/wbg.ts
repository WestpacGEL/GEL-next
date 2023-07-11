import { type BrandConfig } from '../index.js';
import { generateColorShades } from '../utils/generate-color-shades.js';

export const theme: BrandConfig = {
  code: 'WBG',
  colors: generateColorShades({
    background: '#F3F5F6',
    border: '#D3D3D3',
    borderDark: '#91979A',
    focus: '#6892E8',
    heading: '#000',
    hero: '#000',
    light: '#FAFAFA',
    link: '#DA1710',
    muted: '#686362',
    neutral: '#403A38',
    pop: '#FF7468',
    primary: '#DA1710',
    text: '#000',
  }),
  brandFont: 'brandFontWBG',
  name: 'Westpac Group',
};
