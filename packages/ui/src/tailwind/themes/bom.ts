import { DATA_VIS_COLORS } from '../constants/colors.js';
import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#534891';
const POP = '#A094FC';

export const theme: BrandConfig = {
  code: 'BOM',
  colors: {
    ...generateColorTints({
      background: '#F7F7F7',
      border: '#D4D4D8',
      borderDark: '#939299',
      focus: '#867BCD',
      heading: '#534891',
      hero: HERO,
      light: '#FBFBFD',
      link: '#D13900',
      muted: '#6E6C7A',
      neutral: '#595762',
      pop: POP,
      primary: '#D13900',
      text: '#20024E',
      'data-a-solid': DATA_VIS_COLORS['bom-light']['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS['bom-light']['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS['bom-light']['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS['bom-light']['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS['bom-light']['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS['bom-light']['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS['bom-light']['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS['bom-light']['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS['bom-light']['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS['bom-light']['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS['bom-light']['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS['bom-light']['data-f-tint'],
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: POP,
        outline: HERO,
      },
    },
  },
  brandFont: 'Brown Pro',
  name: 'Bank of Melbourne',
};
