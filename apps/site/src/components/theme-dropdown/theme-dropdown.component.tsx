'use client';

import { Dropdown, RadioGroup } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { useCallback, useEffect, useState } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

export function ThemeDropDown({ className }: { className?: string }) {
  const { mode, setMode } = useThemeMode();
  const { setMode: setModeOnDOM, getSystemPreference, getBrandContainer } = useDarkMode();
  const [portalContainer, setPortalContainer] = useState<Element | undefined>();

  useEffect(() => {
    setPortalContainer(getBrandContainer() || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = useCallback(
    (value: string) => {
      setMode(value as 'light' | 'dark' | 'system');
      if (value !== 'system') {
        return setModeOnDOM(value as 'light' | 'dark');
      }
      const systemPreference = getSystemPreference();
      setModeOnDOM(systemPreference);
    },
    [getSystemPreference, setMode, setModeOnDOM],
  );

  return (
    <Dropdown
      placement="bottom right"
      portalContainer={portalContainer}
      color="hero"
      soft
      text="Mode"
      className={className}
      shouldCloseOnInteractOutside={() => false}
    >
      <RadioGroup
        defaultValue={mode}
        onChange={handleOnChange}
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
