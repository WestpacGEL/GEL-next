import { useCallback } from 'react';

export function useDarkMode() {
  const getTheme = useCallback(() => {
    const dataTheme = document.querySelector('[data-theme]')?.getAttribute('data-theme');
    if (dataTheme) {
      return dataTheme;
    }
    return Array.from(document.querySelector('[class^="theme-"], [class*=" theme-"]')?.classList || [])
      ?.find(cls => cls.startsWith('theme-'))
      ?.replace('theme-', '');
  }, []);

  const getMode = useCallback(() => {
    const theme = getTheme();
    if (!theme) {
      return;
    }
    return theme.endsWith('-dark') ? 'dark' : 'light';
  }, [getTheme]);

  const getBrandContainer = useCallback(() => {
    return document.querySelector('[data-theme]') || document.querySelector('[class^="theme-"], [class*=" theme-"]');
  }, []);

  const getSystemPreference = useCallback(() => {
    return window?.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  }, []);

  const setMode = useCallback(
    (mode: 'light' | 'dark') => {
      const themeWithoutMode = getTheme()?.replace('-light', '').replace('-dark', '');
      getBrandContainer()?.setAttribute('data-theme', `${themeWithoutMode}-${mode}`);
    },
    [getTheme],
  );

  const toggleDarkMode = useCallback(() => {
    const newMode = getMode() === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  }, [setMode, getMode]);

  return {
    getTheme,
    getMode,
    getBrandContainer,
    getSystemPreference,
    toggleDarkMode,
    setMode,
  };
}
