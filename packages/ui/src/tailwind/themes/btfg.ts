import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#2574A9';
const PRIMARY = '#9E005D';

export const theme: BrandConfig = {
  code: 'BTFG',
  colors: {
    ...generateColorTints({
      background: '#F9F9F9',
      border: '#E0E0E0',
      borderDark: '#949494',
      focus: '#CA73A6',
      heading: '#2574A9',
      hero: HERO,
      light: '#FCFCFC',
      link: '#9E005D',
      muted: '#666666',
      neutral: '#637B98',
      pop: PRIMARY,
      primary: PRIMARY,
      text: '#333',
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: PRIMARY,
        outline: HERO,
      },
    },
  },
  brandFont: 'Georgia, "Times New Roman", Times, serif',
  name: 'BT Financial Group',
};
