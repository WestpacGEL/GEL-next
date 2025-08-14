'use client';

import { useDarkMode } from '@westpac/ui/hook';
import { ReactNode, useEffect } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  const { getSystemPreference, setMode } = useDarkMode();

  useEffect(() => {
    const { mode } = useThemeMode.getState();
    if (mode === 'system') {
      const systemPreference = getSystemPreference();
      setMode(systemPreference);
      return;
    }
    setMode(mode);
  }, []);

  return children;
}
