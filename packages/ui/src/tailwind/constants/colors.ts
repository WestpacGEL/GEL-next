import { BrandKey } from '../types/brand.types.js';
import { generateColorTints } from '../utils/generate-color-tints.js';

export const BASE_COLORS = {
  success: '#008000',
  info: '#0074C4',
  warning: '#C53B00',
  danger: '#C40000',
  system: '#FF0',
};

export const COLORS = {
  ...generateColorTints(BASE_COLORS),
  white: '#FFF',
  black: '#000',
};

type DataVisColor =
  | 'data-a-solid'
  | 'data-a-tint'
  | 'data-a-opacity'
  | 'data-b-solid'
  | 'data-b-tint'
  | 'data-b-opacity'
  | 'data-c-solid'
  | 'data-c-tint'
  | 'data-c-opacity'
  | 'data-d-solid'
  | 'data-d-tint'
  | 'data-d-opacity'
  | 'data-e-solid'
  | 'data-e-tint'
  | 'data-e-opacity'
  | 'data-f-solid'
  | 'data-f-tint'
  | 'data-f-opacity';

type DataVisValue = Record<DataVisColor, string>;

// These colours need to be included as constants for use with libaries that may not have tailwind compatibility
export const DATA_VIS_COLORS: Record<Exclude<BrandKey, 'btfg'>, DataVisValue> = {
  bom: {
    'data-a-solid': '#D13900',
    'data-a-tint': '#E79B7F',
    'data-a-opacity': '#D139004D',
    'data-b-solid': '#534891',
    'data-b-tint': '#A8A3C7',
    'data-b-opacity': '#5348914D',
    'data-c-solid': '#A094FC',
    'data-c-tint': '#CFC9FD',
    'data-c-opacity': '#A094FC4D',
    'data-d-solid': '#20024E',
    'data-d-tint': '#8F80A6',
    'data-d-opacity': '#20024E4D',
    'data-e-solid': '#D17E15',
    'data-e-tint': '#E8BE8A',
    'data-e-opacity': '#D17E154D',
    'data-f-solid': '#9E2A00',
    'data-f-tint': '#CE9480',
    'data-f-opacity': '#9E2A004D',
  },
  bsa: {
    'data-a-solid': '#D81B2B',
    'data-a-tint': '#EB8C94',
    'data-a-opacity': '#D81B2B4D',
    'data-b-solid': '#002F6C',
    'data-b-tint': '#7F96B5',
    'data-b-opacity': '#002F6C4D',
    'data-c-solid': '#00ADBD',
    'data-c-tint': '#7FD5DD',
    'data-c-opacity': '#00ADBD4D',
    'data-d-solid': '#5CBB3E',
    'data-d-tint': '#ADDC9E',
    'data-d-opacity': '#5CBB3E4D',
    'data-e-solid': '#F7921E',
    'data-e-tint': '#FAC88E',
    'data-e-opacity': '#F7921E4D',
    'data-f-solid': '#A22269',
    'data-f-tint': '#D090B3',
    'data-f-opacity': '#A222694D',
  },
  rams: {
    'data-a-solid': '#047DBC',
    'data-a-tint': '#81BDDD',
    'data-a-opacity': '#047DBC4D',
    'data-b-solid': '#0F446C',
    'data-b-tint': '#86A1B5',
    'data-b-opacity': '#0F446C4D',
    'data-c-solid': '#78C339',
    'data-c-tint': '#BBE09B',
    'data-c-opacity': '#78C3394D',
    'data-d-solid': '#0BC2FF',
    'data-d-tint': '#84E0FF',
    'data-d-opacity': '#0BC2FF4D',
    'data-e-solid': '#D0D400',
    'data-e-tint': '#E7E980',
    'data-e-opacity': '#D0D4004D',
    'data-f-solid': '#00C2D4',
    'data-f-tint': '#80E0EA',
    'data-f-opacity': '#00C2D44D',
  },
  stg: {
    'data-a-solid': '#E30000',
    'data-a-tint': '#F07F7F',
    'data-a-opacity': '#E300004D',
    'data-b-solid': '#502D79',
    'data-b-tint': '#A795BB',
    'data-b-opacity': '#502D794D',
    'data-c-solid': '#FF7F29',
    'data-c-tint': '#FFBE93',
    'data-c-opacity': '#FF7F294D',
    'data-d-solid': '#78BE20',
    'data-d-tint': '#BBDE8F',
    'data-d-opacity': '#78BE204D',
    'data-e-solid': '#3FC3EB',
    'data-e-tint': '#9EE0F4',
    'data-e-opacity': '#3FC3EB4D',
    'data-f-solid': '#008739',
    'data-f-tint': '#7FC29B',
    'data-f-opacity': '#0087394D',
  },
  wbc: {
    'data-a-solid': '#DA1710',
    'data-a-tint': '#EC8A87',
    'data-a-opacity': '#DA17104D',
    'data-b-solid': '#1F1C4F',
    'data-b-tint': '#8E8DA6',
    'data-b-opacity': '#1F1C4F4D',
    'data-c-solid': '#FF3DDB',
    'data-c-tint': '#FF9DEC',
    'data-c-opacity': '#FF3DDB4D',
    'data-d-solid': '#991AD6',
    'data-d-tint': '#CB8CEA',
    'data-d-opacity': '#991AD64D',
    'data-e-solid': '#990000',
    'data-e-tint': '#CB7F7F',
    'data-e-opacity': '#9900004D',
    'data-f-solid': '#F57A0F',
    'data-f-tint': '#FABC87',
    'data-f-opacity': '#F57A0F4D',
  },
  wbg: {
    'data-a-solid': '#DA1710',
    'data-a-tint': '#EC8A87',
    'data-a-opacity': '#DA17104D',
    'data-b-solid': '#685AC0',
    'data-b-tint': '#B3ACDF',
    'data-b-opacity': '#685AC04D',
    'data-c-solid': '#84DCE0',
    'data-c-tint': '#C1EDEF',
    'data-c-opacity': '#84DCE04D',
    'data-d-solid': '#FF7468',
    'data-d-tint': '#FFB9B3',
    'data-d-opacity': '#FF74684D',
    'data-e-solid': '#D4DE25',
    'data-e-tint': '#E9EE91',
    'data-e-opacity': '#D4DE254D',
    'data-f-solid': '#009ED4',
    'data-f-tint': '#7FCEE9',
    'data-f-opacity': '#009ED44D',
  },
};
