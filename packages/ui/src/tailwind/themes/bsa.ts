import { DATA_VIS_COLORS } from '../constants/colors.js';
import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const HERO = '#002F6C';
const POP = '#00ADBD'; //Bight

export const theme: BrandConfig = {
  code: 'BSA',
  colors: {
    ...generateColorTints({
      background: '#F3F4F4',
      border: '#D3D4D5',
      borderDark: '#909396',
      focus: '#C26F9D',
      heading: '#002F6C',
      hero: HERO,
      light: '#FAFAFA',
      link: '#D81B2B',
      muted: '#6A6E72',
      neutral: '#6A6E72',
      pop: POP,
      primary: '#D81B2B',
      text: '#333',
      'data-a-solid': DATA_VIS_COLORS.bsa['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS.bsa['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS.bsa['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS.bsa['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS.bsa['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS.bsa['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS.bsa['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS.bsa['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS.bsa['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS.bsa['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS.bsa['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS.bsa['data-f-tint'],
    }),
    pictogram: {
      dark: HERO,
      duo: {
        highlight: POP,
        outline: HERO,
      },
    },
  },

  brandFont: 'Aller',
  name: 'BankSA',
};
