import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#1F1C4F';
const PRIMARY = '#DA1710';

export const theme: BrandConfig = {
  code: 'WBC',
  colors: {
    ...generateColorTints({
      background: '#F3F4F6',
      border: '#DEDEE1',
      borderDark: '#9390A2',
      focus: '#B978D9',
      heading: '#1F1C4F',
      hero: HERO,
      light: '#F9F9FB',
      link: '#DA1710',
      muted: '#595767',
      neutral: '#2A2E42',
      pop: '#FF3DDB', //Bright Pink
      primary: PRIMARY,
      text: '#181B25',
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: PRIMARY,
        outline: HERO,
      },
    },
  },
  brandFont: 'Westpac',
  name: 'Westpac',
};
