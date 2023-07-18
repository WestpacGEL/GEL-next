import { DEFAULT_BODY_TYPOGRAPHY } from '../constants/index.js';

import { theme as BOMTheme } from './bom.js';
import { theme as BSATheme } from './bsa.js';
import { theme as BTFGTheme } from './btfg.js';
import { theme as RAMSTheme } from './rams.js';
import { theme as STGTheme } from './stg.js';
import { theme as WBCTheme } from './wbc.js';
import { theme as WBGTheme } from './wbg.js';

export const ALL_THEMES = [BOMTheme, BSATheme, BTFGTheme, RAMSTheme, STGTheme, WBCTheme, WBGTheme];

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
