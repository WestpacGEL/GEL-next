'use client';

import { Dropdown, RadioGroup } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { useEffect, useState } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

export function ThemeDropDown({ className }: { className?: string }) {
  const { preference, setMode } = useThemeMode();
  const { getBrandContainer } = useDarkMode();
  const [portalContainer, setPortalContainer] = useState<Element | undefined>();

  useEffect(() => {
    setPortalContainer(getBrandContainer() || undefined);
  }, [getBrandContainer]);

  return (
    <Dropdown
      placement="bottom right"
      portalContainer={portalContainer}
      look="hero"
      soft
      text="Mode"
      className={className}
      shouldCloseOnInteractOutside={() => false}
    >
      <RadioGroup
        aria-label="Colour mode"
        value={preference}
        onChange={value => setMode(value as 'light' | 'dark' | 'system')}
        size="large"
        radios={[
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' },
          { value: 'system', label: 'System' },
        ]}
      />
    </Dropdown>
  );
}
