export type BrandKey = 'bom' | 'bsa' | 'btfg' | 'rams' | 'stg' | 'wbc' | 'wbg';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT';
type ColorValue = Record<'DEFAULT' | ColorShade, string>;
type ColorsKey =
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
type ColorConfig = Record<ColorsKey, ColorValue>;

export type BrandConfig = {
  brandFont: string;
  code: string;
  colors: ColorConfig;
  name: string;
};
