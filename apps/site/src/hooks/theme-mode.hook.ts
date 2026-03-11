'use client';

// TODO: DARK MODE TEMPORARILY DISABLED - REVERT TO THIS ONCE DARK MODE IS RE-IMPLEMENTED
// import { useDarkMode } from '@westpac/ui/hook';
// import { useEffect, useState } from 'react';
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
  const mode = 'light';
  // TODO: DARK MODE TEMPORARILY DISABLED - REVERT TO THIS ONCE DARK MODE IS RE-IMPLEMENTED
  // const [mode, setMode] = useState<'light' | 'dark'>('light');
  // const { getSystemPreference } = useDarkMode();
  const props = useThemeModeZustand();

  // TODO: DARK MODE TEMPORARILY DISABLED - REVERT TO THIS ONCE DARK MODE IS RE-IMPLEMENTED
  // useEffect(() => {
  //   if (props.mode === 'system') {
  //     setMode(getSystemPreference());
  //     return;
  //   }
  //   setMode(props.mode);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.mode]);

  return {
    ...props,
    mode: mode || 'light',
  };
}
