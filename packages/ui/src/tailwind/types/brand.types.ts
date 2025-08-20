export type BrandKey = 'bom' | 'bsa' | 'btfg' | 'rams' | 'stg' | 'wbc' | 'wbg';
export type Mode = 'light' | 'dark';
export type BrandKeyWithThemes = `${BrandKey}-${Mode}`;

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT';
type ColorValue = Record<'DEFAULT' | ColorShade, string>;
export type ColorsKey =
  | 'screen-background-white-black'
  | 'screen-background-pale-black'
  | 'screen-background-white-pale'
  | 'screen-background-pale-faint'
  | 'surface-white-pale'
  | 'surface-white-faint'
  | 'surface-muted'
  | 'surface-muted-vivid'
  | 'surface-muted-strong'
  | 'surface-muted-mild'
  | 'surface-muted-soft'
  | 'surface-muted-pale'
  | 'surface-muted-faint'
  | 'surface-mono'
  | 'surface-primary'
  | 'surface-primary-faint'
  | 'surface-hero'
  | 'surface-hero-faint'
  | 'surface-pop'
  | 'surface-pop-faint'
  | 'surface-holler'
  | 'surface-holler-faint'
  | 'surface-sing'
  | 'surface-sing-faint'
  | 'surface-dance'
  | 'surface-dance-faint'
  | 'surface-success'
  | 'surface-success-faint'
  | 'surface-info'
  | 'surface-info-faint'
  | 'surface-warning'
  | 'surface-warning-faint'
  | 'surface-danger'
  | 'surface-danger-faint'
  | 'surface-system-error'
  | 'surface-system-error-dark'
  | 'text-body'
  | 'text-heading'
  | 'text-muted'
  | 'text-primary'
  | 'text-hero'
  | 'text-holler'
  | 'text-link'
  | 'text-success'
  | 'text-info'
  | 'text-warning'
  | 'text-danger'
  | 'text-system-error'
  | 'text-mono'
  | 'border-muted'
  | 'border-muted-strong'
  | 'border-muted-mild'
  | 'border-muted-soft'
  | 'border-hero'
  | 'border-primary'
  | 'border-pop'
  | 'border-holler'
  | 'border-sing'
  | 'border-dance'
  | 'border-success'
  | 'border-success-mild'
  | 'border-info'
  | 'border-info-mild'
  | 'border-warning'
  | 'border-warning-mild'
  | 'border-danger'
  | 'border-danger-mild'
  | 'border-mono'
  | 'border-focus'
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
  | 'data-f-opacity'
  | 'surface-pictogram-base'
  | 'surface-pictogram-accent'
  | 'surface-hover-primary'
  | 'surface-active-primary'
  | 'surface-hover-hero'
  | 'surface-active-hero'
  | 'surface-hover-primary-faint'
  | 'surface-active-primary-faint'
  | 'surface-hover-hero-faint'
  | 'surface-active-hero-faint'
  | 'surface-hover-muted-pale'
  | 'surface-active-muted-pale'
  | 'surface-hover-mono'
  | 'surface-active-mono';

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
