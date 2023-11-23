export type BrandKey = 'bom' | 'bsa' | 'btfg' | 'rams' | 'stg' | 'wbc' | 'wbg';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT';
type ColorValue = Record<'DEFAULT' | ColorShade, string>;
export type ColorsKey =
  | 'background'
  | 'border'
  | 'borderDark'
  | 'focus'
  | 'heading'
  | 'hero'
  | 'light'
  | 'link'
  | 'muted'
  | 'neutral'
  | 'pop'
  | 'primary'
  | 'text'
  | 'white'
  | 'black';
type PictogramColorMap = { dark: string; duo: { highlight: string; outline: string } };
type PictogramConfig = Record<'pictogram', PictogramColorMap>;
type ColorConfig = Record<ColorsKey, ColorValue>;

export type BrandConfig = {
  brandFont: string;
  code: string;
  colors: ColorConfig & PictogramConfig;
  name: string;
};

export type FontFace = {
  '@font-face': {
    'font-family': string;
    'font-style': string;
    'font-weight': string;
    src: string;
  };
};
