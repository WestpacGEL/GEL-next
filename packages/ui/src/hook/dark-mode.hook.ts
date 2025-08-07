import { useCallback, useMemo } from 'react';

export function useDarkMode() {
  const theme = useMemo(() => {
    const dataTheme = document.querySelector('[data-theme]')?.getAttribute('data-theme');
    if (dataTheme) {
      return dataTheme;
    }
    return Array.from(document.querySelector('[class^="theme-"], [class*=" theme-"]')?.classList || [])
      ?.find(cls => cls.startsWith('theme-'))
      ?.replace('theme-', '');
  }, []);

  const mode = useMemo(() => {
    if (!theme) {
      return;
    }
    return theme.endsWith('-dark') ? 'dark' : 'light';
  }, [theme]);

  const getBrandContainer = useCallback(() => {
    return document.querySelector('[data-theme]') || document.querySelector('[class^="theme-"], [class*=" theme-"]');
  }, []);

  return {
    theme,
    mode,
    getBrandContainer,
  };
}
