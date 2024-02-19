import { DATA_VIS_COLORS } from '../constants/colors.js';
import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

const TEXT = '#004833';
const POP = '#78BE20'; //St.George Green

export const theme: BrandConfig = {
  code: 'STG',
  colors: {
    ...generateColorTints({
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
      pop: POP,
      primary: '#E30000',
      text: TEXT,
      'data-a-solid': DATA_VIS_COLORS.stg['data-a-solid'],
      // tint values need to be specified rather than using tailwind generated due to difference in provided value
      'data-a-tint': DATA_VIS_COLORS.stg['data-a-tint'],
      'data-b-solid': DATA_VIS_COLORS.stg['data-b-solid'],
      'data-b-tint': DATA_VIS_COLORS.stg['data-b-tint'],
      'data-c-solid': DATA_VIS_COLORS.stg['data-c-solid'],
      'data-c-tint': DATA_VIS_COLORS.stg['data-c-tint'],
      'data-d-solid': DATA_VIS_COLORS.stg['data-d-solid'],
      'data-d-tint': DATA_VIS_COLORS.stg['data-d-tint'],
      'data-e-solid': DATA_VIS_COLORS.stg['data-e-solid'],
      'data-e-tint': DATA_VIS_COLORS.stg['data-e-tint'],
      'data-f-solid': DATA_VIS_COLORS.stg['data-f-solid'],
      'data-f-tint': DATA_VIS_COLORS.stg['data-f-tint'],
    }),
    pictogram: {
      dark: TEXT,
      duo: {
        highlight: POP,
        outline: TEXT,
      },
    },
  },
  brandFont: 'Dragon Bold',
  name: 'St.George',
};
