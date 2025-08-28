'use client';

import { useDarkMode } from '@westpac/ui/hook';
import { useEffect, useState } from 'react';
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
  const [mode, setMode] = useState<'light' | 'dark'>();
  const { getSystemPreference } = useDarkMode();
  const props = useThemeModeZustand();

  useEffect(() => {
    if (props.mode === 'system') {
      setMode(getSystemPreference());
      return;
    }
    setMode(props.mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mode]);

  return {
    ...props,
    mode: mode || 'light',
  };
}
