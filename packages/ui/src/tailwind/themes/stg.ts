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
