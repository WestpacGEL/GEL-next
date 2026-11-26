'use client';

import { useDarkMode } from '@westpac/ui/hook';
import { ReactNode, useEffect } from 'react';

import { useBrand } from '@/app/design-system/hooks/use-brand';
import { useThemeMode } from '@/hooks/theme-mode.hook';

// eslint-disable-next-line sonarjs/function-return-type
export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  const { setMode } = useDarkMode();
  const { mode } = useThemeMode();
  const brand = useBrand()?.key;

  useEffect(() => {
    setMode(mode);
  }, [brand, mode, setMode]);

  return children;
}
