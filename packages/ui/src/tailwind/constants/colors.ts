import { generateColorShades } from '../utils/generate-color-shades.js';

export const BASE_COLORS = {
  success: '#008000',
  info: '#0074C4',
  warning: '#C53B00',
  danger: '#C40000',
  system: '#FF0',
};

export const COLORS = {
  ...generateColorShades(BASE_COLORS),
  white: '#FFF',
  black: '#000',
};
