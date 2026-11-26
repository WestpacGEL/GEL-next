'use client';

import { useMediaQuery } from 'usehooks-ts';
import { create } from 'zustand';

type Mode = 'light' | 'dark' | 'system';
type ThemeState = {
  setMode: (theme: Mode) => void;
  mode: Mode;
};

const useThemeModeZustand = create<ThemeState>()(set => ({
  setMode: theme => set(() => ({ mode: theme })),
  mode: 'system',
}));

export function useThemeMode() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', { initializeWithValue: false });
  const systemMode = prefersDark ? 'dark' : 'light';
  const props = useThemeModeZustand();

  return {
    ...props,
    preference: props.mode,
    mode: props.mode === 'system' ? systemMode : props.mode,
  };
}
