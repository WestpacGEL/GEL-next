import { useCallback } from 'react';

export function useDarkMode() {
  const getBrand = useCallback(() => {
    return document.querySelector('[data-brand]')?.getAttribute('data-brand');
  }, []);

  const getMode = useCallback(() => {
    return document.querySelector('[data-theme]')?.getAttribute('data-theme') || 'light';
  }, []);

  const getBrandContainer = useCallback(() => {
    return document.querySelector('[data-brand]');
  }, []);

  const getSystemPreference = useCallback(() => {
    return window?.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  }, []);

  const setMode = useCallback(
    (mode: 'light' | 'dark') => {
      getBrandContainer()?.setAttribute('data-theme', mode);
    },
    [getBrandContainer],
  );

  const toggleDarkMode = useCallback(() => {
    const newMode = getMode() === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  }, [setMode, getMode]);

  return {
    getBrand,
    getMode,
    getBrandContainer,
    getSystemPreference,
    toggleDarkMode,
    setMode,
  };
}
