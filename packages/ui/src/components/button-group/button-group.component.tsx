'use client';

import React, { useCallback, useMemo } from 'react';
import { useToggleButtonGroup } from 'react-aria';
import { useToggleGroupState } from 'react-stately';

import { styles as buttonGroupStyles } from './button-group.styles.js';

import type { ButtonGroupProps } from './button-group.types.js';
import type { Key, ToggleGroupState } from 'react-stately';

export const ToggleButtonGroupContext = React.createContext<
  | (ToggleGroupState & {
      size: ButtonGroupProps['size'];
      look: ButtonGroupProps['look'];
      block: ButtonGroupProps['block'];
    })
  | null
>(null);

export function ButtonGroup({ size, look, block, children, onSelect, ...props }: ButtonGroupProps) {
  const finalSelectedKeys = useMemo(() => {
    if (props.selectedKeys === undefined) {
      return props.selectedKeys;
    }
    if (props.selectionMode === 'single' || props.selectionMode === undefined) {
      return new Set([props.selectedKeys]);
    }
    if (props.selectionMode === 'multiple') {
      return props.selectedKeys;
    }
  }, [props.selectedKeys, props.selectionMode]);

  const finalDefaultSelectedKeys = useMemo(() => {
    if (props.defaultSelectedKeys === undefined) {
      return props.defaultSelectedKeys;
    }
    if (props.selectionMode === 'single' || props.selectionMode === undefined) {
      return new Set([props.defaultSelectedKeys]);
    }
    if (props.selectionMode === 'multiple') {
      return props.defaultSelectedKeys;
    }
  }, [props.defaultSelectedKeys, props.selectionMode]);

  const handleSelectionChange = useCallback(
    (value: Set<Key>) => {
      if (props.selectionMode === 'single' || props.selectionMode === undefined) {
        return props.onSelectionChange?.(value ? [...(value || [])][0] : value);
      }
      if (props.selectionMode === 'multiple') {
        props.onSelectionChange?.(value);
      }
    },
    [props],
  );

  const state = useToggleGroupState({
    ...props,
    onSelectionChange: handleSelectionChange,
    defaultSelectedKeys: finalDefaultSelectedKeys,
    selectedKeys: finalSelectedKeys,
  });

  const ref = React.useRef<HTMLDivElement | null>(null);
  const { groupProps } = useToggleButtonGroup(
    {
      ...props,
      onSelectionChange: handleSelectionChange,
      defaultSelectedKeys: finalDefaultSelectedKeys,
      selectedKeys: finalSelectedKeys,
    },
    state,
    ref,
  );

  const styles = buttonGroupStyles({});

  return (
    <div {...props} {...groupProps} className={styles.base({ className: props.className })} ref={ref}>
      <ToggleButtonGroupContext.Provider value={{ ...state, size, look, block }}>
        {children}
      </ToggleButtonGroupContext.Provider>
    </div>
  );
}
