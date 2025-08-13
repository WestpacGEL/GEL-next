'use client';

import { useCallback } from 'react';

import { ButtonDropdown, RadioGroup } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { useThemeMode } from '@/hooks/theme-mode.hook';

export function ThemeDropDown() {
  const { mode, setMode } = useThemeMode();
  const { setMode: setModeOnDOM, getMode, getSystemPreference } = useDarkMode();

  const handleOnChange = useCallback((value: string) => {
    setMode(value as 'light'|'dark' |'system');
    if(value !== 'system'){
      return setModeOnDOM(value as 'light' | 'dark');
    }
    const systemPreference = getSystemPreference();
    setModeOnDOM(systemPreference);
  }, []);

  return (
    <ButtonDropdown color='primary' soft text="Theme" className='relative z-20'>
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
  )
}
