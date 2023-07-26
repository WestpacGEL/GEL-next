import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const theme: BrandConfig = {
  code: 'WBG',
  colors: generateColorTints({
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
  brandFont: 'Montserrat',
  name: 'Westpac Group',
};
