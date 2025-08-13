import { DATA_VIS_COLORS } from '../constants/colors.js';
import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#000';
const BORDER_DARK = '#91979A';

export const theme: BrandConfig = {
  code: 'WBG',
  colors: {
    ...generateColorTints({
      background: '#F3F5F6',
      border: '#D3D3D3',
      borderDark: BORDER_DARK,
      focus: '#6892E8',
      heading: '#000',
      hero: HERO,
      light: '#FAFAFA',
      link: '#DA1710',
      muted: '#686362',
      neutral: '#403A38',
      pop: '#FF7468',
      primary: '#DA1710',
      text: '#000',
      'data-a-solid': DATA_VIS_COLORS['wbg-light']['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS['wbg-light']['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS['wbg-light']['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS['wbg-light']['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS['wbg-light']['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS['wbg-light']['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS['wbg-light']['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS['wbg-light']['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS['wbg-light']['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS['wbg-light']['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS['wbg-light']['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS['wbg-light']['data-f-tint'],
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: BORDER_DARK,
        outline: HERO,
      },
    },
  },
  brandFont: 'Montserrat',
  name: 'Westpac Group',
};
