import { create } from 'zustand';

import { BrandKey, Theme } from './theme.types';
import { BOMTheme, BSATheme, STGTheme, WBCTheme } from './themes';

type ThemeState = {
  activeTheme: Theme;
  activeThemeKey: BrandKey;
  brandName: Record<BrandKey, string>;
  setTheme: (theme: BrandKey) => void;
  themes: Record<BrandKey, Theme>;
};

export const useThemeStore = create<ThemeState>()(set => ({
  activeTheme: WBCTheme,
  activeThemeKey: 'wbc',
  brandName: {
    wbc: 'Westpac',
    stg: 'St. George',
    bom: 'Bank of Melbourne',
    bsa: 'BankSA',
  },
  setTheme: theme => set(state => ({ activeThemeKey: theme, activeTheme: state.themes[theme] })),
  themes: {
    wbc: WBCTheme,
    bom: BOMTheme,
    bsa: BSATheme,
    stg: STGTheme,
  },
}));
