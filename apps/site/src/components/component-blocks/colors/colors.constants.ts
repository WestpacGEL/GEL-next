import { type BrandKey, type ColorsKey } from '@westpac/ui/tailwind';

export const PRIMARY_COLORS: ColorsKey[] = [
  'primary',
  'hero',
  'neutral',
  'heading',
  'text',
  'muted',
  'border',
  'background',
  'light',
];

export const SECONDARY_COLORS: Record<BrandKey, Record<string, string>> = {
  wbc: {
    'Bright Purple': '#991AD6',
    'Bright Pink': '#FF3DDB',
    'Dark Red': '#990000',
    'Light Grey': '#E8E8ED',
    'Light Purple': '#E0BAF2',
    'Light Pink': '#FFD9F7',
  },
  bom: {
    'Dark Purple': '#20024E',
    'Mid Purple': '#685AC0',
    'Light Purple': '#A094FC',
  },
  stg: {
    Sky: '#3FC3EB',
    Plum: '#502D79',
    Amber: '#FF7F29',
    'St.George Green': '#78BE20',
    'St.George Yellow': '#FFCD00',
  },
  btfg: {
    'BT Blue': '#00AFD7',
    'BT Black': '#2C2A29',
    'BT Steel': '#80A1B6',
  },
  bsa: {
    Deep: '#00204F',
    Bight: '#00ADBD',
    Gum: '#5CBB3E',
    Grape: '#A22269',
    Sky: '#ABE2EC',
    Outback: '#F7921E',
  },
  wbg: {
    Red: '#DA1710',
    Croral: '#FF7468',
    Pink: '#F9C1CF',
    Purple: '#685AC0',
    Lilac: '#A094FC',
    Aqua: '#84DCE0',
    Navy: '#002F6C',
    Cobalt: '#376EE2',
    Cyan: '#009ED4',
    Green: '#78BE20',
    Pine: '#002B14',
    Lime: '#D4DE25',
  },
  rams: {
    'RAMS Blue': '#0092CD',
    'RAMS Green': '#78C339',
    'Mid Blue': '#0BC2FF',
    'Light Blue': '#86E1FF',
    'Light Green': '#B7E096',
  },
};
