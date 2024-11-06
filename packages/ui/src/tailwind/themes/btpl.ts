import { type BrandConfig } from '../index.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const theme: BrandConfig = {
  code: 'BTPL',
  colors: {
    ...generateColorTints({
      background: '#F5F5F5',
      border: '#D9D9D9',
      heading: '#171717',
      hero: '#00345A',
      light: '#F9F9F9',
      link: '#006DBC',
      muted: '#666666',
      neutral: '#2A2E42',
      pop: '#672993',
      // Pop Light: #F7F4FA
      primary: '#006DBC',
      text: '#171717',
      borderDark: '#949494',
      focus: '#B470D7',
    }),
    pictogram: {
      dark: '#00345A',
      duo: {
        highlight: '#006DBC',
        outline: '#00345A',
      },
    },
  },
  brandFont: '',
  name: 'BT Panorama',
};
