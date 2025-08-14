'use client';

import { ButtonDropdown, RadioGroup } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { useCallback, useMemo } from 'react';

import { useThemeMode } from '@/hooks/theme-mode.hook';

export function ThemeDropDown() {
  const { mode, setMode } = useThemeMode();
  const { setMode: setModeOnDOM, getSystemPreference, getBrandContainer } = useDarkMode();

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

  const portal: Element | boolean = useMemo(() => {
    if (typeof window !== 'undefined') {
      return getBrandContainer() || true;
    }
    return true;
  }, [getBrandContainer]);

  return (
    <ButtonDropdown portal={portal} color="primary" soft text="Theme" className="relative z-20">
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
