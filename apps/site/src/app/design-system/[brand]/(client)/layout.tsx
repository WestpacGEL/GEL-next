'use client';

import { useDarkMode } from '@westpac/ui/hook';
import { ReactNode, useEffect } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

// eslint-disable-next-line sonarjs/function-return-type
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
