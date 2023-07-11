import { type BrandConfig } from '../index.js';
import { generateColorShades } from '../utils/generate-color-shades.js';

export const theme: BrandConfig = {
  code: 'BTFG',
  colors: generateColorShades({
    background: '#F9F9F9',
    border: '#E0E0E0',
    borderDark: '#949494',
    focus: '#CA73A6',
    heading: '#2574A9',
    hero: '#2574A9',
    light: '#FCFCFC',
    link: '#9E005D',
    muted: '#666666',
    neutral: '#637B98',
    pop: '#9E005D', //Primary
    primary: '#9E005D',
    text: '#333',
  }),
  brandFont: 'brandFontBTFG',
  name: 'BT Financial Group',
};
