import { DATA_VIS_COLORS } from '../constants/colors.js';
import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const PRIMARY = '#047DBC';
const POP = '#78C339'; //RAMS Green

export const theme: BrandConfig = {
  code: 'RAMS',
  colors: {
    ...generateColorTints({
      background: '#F3F4F4',
      border: '#D3D4D5',
      borderDark: '#909396',
      focus: '#009CDB',
      heading: '#1972B4',
      hero: '#0F446C',
      light: '#FAFAFA',
      link: '#1972B4',
      muted: '#6A6E72',
      neutral: '#848588',
      pop: POP,
      primary: PRIMARY,
      text: '#333',
      'data-a-solid': DATA_VIS_COLORS['rams-light']['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS['rams-light']['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS['rams-light']['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS['rams-light']['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS['rams-light']['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS['rams-light']['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS['rams-light']['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS['rams-light']['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS['rams-light']['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS['rams-light']['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS['rams-light']['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS['rams-light']['data-f-tint'],
    }),
    pictogram: {
      dark: PRIMARY,
      duo: {
        highlight: POP,
        outline: PRIMARY,
      },
    },
  },
  brandFont: 'Source Sans Pro',
  name: 'RAMS',
};
