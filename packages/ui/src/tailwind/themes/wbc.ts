import { DATA_VIS_COLORS } from '../constants/colors.js';
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
      'data-a-solid': DATA_VIS_COLORS['wbc-light']['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS['wbc-light']['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS['wbc-light']['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS['wbc-light']['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS['wbc-light']['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS['wbc-light']['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS['wbc-light']['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS['wbc-light']['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS['wbc-light']['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS['wbc-light']['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS['wbc-light']['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS['wbc-light']['data-f-tint'],
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
