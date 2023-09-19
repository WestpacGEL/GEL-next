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
