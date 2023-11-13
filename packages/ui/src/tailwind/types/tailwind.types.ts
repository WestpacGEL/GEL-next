import { type BrandKey } from './brand.types.js';

export type PluginOptions = {
  brandFonts?: {
    brands?: Exclude<BrandKey, 'btfg'> | Exclude<BrandKey, 'btfg'>[];
    src: string;
  };
};
