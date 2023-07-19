import { type BrandConfig } from '../index.js';
import { generateColorShades } from '../utils/generate-color-shades.js';

export const theme: BrandConfig = {
  code: 'STG',
  colors: generateColorShades({
    background: '#F5F5F4',
    border: '#D6D5D0',
    borderDark: '#949386',
    focus: '#9681AF',
    heading: '#004833',
    hero: '#008739',
    light: '#FAFAF9',
    link: '#E30000',
    muted: '#727163',
    neutral: '#727163',
    pop: '#78BE20', //St.George Green
    primary: '#E30000',
    text: '#004833',
  }),
  brandFont: 'Dragon Bold',
  name: 'St.George',
};
