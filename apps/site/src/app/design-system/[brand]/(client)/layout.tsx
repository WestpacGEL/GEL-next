'use client';

import { useDarkMode } from '@westpac/ui/hook';
import { ReactNode, useEffect } from 'react';

// TODO: DARK MODE TEMPORARILY DISABLED - REVERT TO THIS ONCE DARK MODE IS RE-IMPLEMENTED
// import { useThemeMode } from '@/hooks/theme-mode.hook';

// eslint-disable-next-line sonarjs/function-return-type
export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  const { setMode } = useDarkMode();
  // TODO: DARK MODE TEMPORARILY DISABLED - REVERT TO THIS ONCE DARK MODE IS RE-IMPLEMENTED
  // const { mode } = useThemeMode();

  useEffect(() => {
    // TODO: DARK MODE TEMPORARILY DISABLED - change to mode when re-enabled
    setMode('light');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
