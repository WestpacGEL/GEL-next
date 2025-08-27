'use client';

import { ButtonDropdown, RadioGroup } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { useCallback, useEffect, useState } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

export function ThemeDropDown({ className }: { className?: string }) {
  const { mode, setMode } = useThemeMode();
  const { setMode: setModeOnDOM, getSystemPreference, getBrandContainer } = useDarkMode();
  const [portalContainer, setPortalContainer] = useState<Element | undefined>();

  useEffect(() => {
    setPortalContainer(getBrandContainer() || undefined);
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
    <ButtonDropdown
      placement="bottom right"
      portalContainer={portalContainer}
      color="primary"
      soft
      text="Theme"
      className={className}
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
    </ButtonDropdown>
  );
}
