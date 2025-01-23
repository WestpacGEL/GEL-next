import { DEFAULT_BODY_TYPOGRAPHY } from '../constants/index.js';
import { BrandConfig, BrandKey } from '../types/brand.types.js';

import { theme as BOMTheme } from './bom.js';
import { theme as BSATheme } from './bsa.js';
import { theme as BTFGTheme } from './btfg.js';
import { theme as BTPLTheme } from './btpl.js';
import { theme as RAMSTheme } from './rams.js';
import { theme as STGTheme } from './stg.js';
import { theme as WBCTheme } from './wbc.js';
import { theme as WBGTheme } from './wbg.js';

// ALL_THEMES, THEMES are used for documentation and as per GEL Team request we dont display BTPL Theme in any public documentation i.e. storybook, site etc
export const ALL_THEMES = [BOMTheme, BSATheme, BTFGTheme, RAMSTheme, STGTheme, WBCTheme, WBGTheme, BTPLTheme];

export const THEMES = ALL_THEMES.map(theme => {
  return {
    name: theme.code,
    selectors: [`.theme-${theme.code.toLowerCase()}`, `[data-theme="${theme.code.toLowerCase()}"]`],
    extend: {
      fontFamily: {
        brand: [theme.brandFont, ...DEFAULT_BODY_TYPOGRAPHY],
      },
      colors: theme.colors,
    },
  };
});

export const THEME: Record<Uppercase<BrandKey | 'BTPL'>, BrandConfig> = {
  BOM: BOMTheme,
  BSA: BSATheme,
  BTFG: BTFGTheme,
  BTPL: BTPLTheme,
  RAMS: RAMSTheme,
  STG: STGTheme,
  WBC: WBCTheme,
  WBG: WBGTheme,
};
