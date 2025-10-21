'use client';

import React from 'react';
import { useToggleButtonGroup } from 'react-aria';
import { useToggleGroupState } from 'react-stately';

import { styles as buttonGroupStyles } from './button-group.styles.js';

import type { ButtonGroupProps } from './button-group.types.js';
import type { ToggleGroupState } from 'react-stately';

export const ToggleButtonGroupContext = React.createContext<
  | (ToggleGroupState & {
      size: ButtonGroupProps['size'];
      look: ButtonGroupProps['look'];
      block: ButtonGroupProps['block'];
    })
  | null
>(null);

export function ButtonGroup({ size, look, block, children, ...props }: ButtonGroupProps) {
  const state = useToggleGroupState(props);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { groupProps } = useToggleButtonGroup(props, state, ref);
  const styles = buttonGroupStyles({});

  return (
    <div {...groupProps} className={styles.base({ className: props.className })} ref={ref}>
      <ToggleButtonGroupContext.Provider value={{ ...state, size, look, block }}>
        {children}
      </ToggleButtonGroupContext.Provider>
    </div>
  );
}
