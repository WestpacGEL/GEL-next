import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const theme: BrandConfig = {
  code: 'BTFG',
  colors: generateColorTints({
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
  brandFont: 'Georgia, "Times New Roman", Times, serif',
  name: 'BT Financial Group',
};
