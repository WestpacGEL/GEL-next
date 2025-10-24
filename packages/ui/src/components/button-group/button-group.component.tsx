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
      orientation: ButtonGroupProps['orientation'];
    })
  | null
>(null);

export function ButtonGroup({
  size,
  look,
  block,
  children,
  onSelect,
  orientation = 'horizontal',
  selectionMode,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  className,
  ...props
}: ButtonGroupProps) {
  /**
   * Normalizes key sets depending on selection mode.
   */
  const normalizeKeys = useCallback(
    (keys?: Key | Iterable<Key>) => {
      if (keys === undefined) return undefined;
      if (selectionMode === 'multiple') return new Set(keys as Iterable<Key>);
      return new Set([keys as Key]);
    },
    [selectionMode],
  );

  const finalSelectedKeys = useMemo(() => normalizeKeys(selectedKeys), [normalizeKeys, selectedKeys]);
  const finalDefaultSelectedKeys = useMemo(
    () => normalizeKeys(defaultSelectedKeys),
    [normalizeKeys, defaultSelectedKeys],
  );

  const handleSelectionChange = useCallback(
    (value: Set<Key>) => {
      if (selectionMode === 'single' || selectionMode === undefined) {
        return onSelectionChange?.(value ? [...(value || [])][0] : value);
      }
      if (selectionMode === 'multiple') {
        onSelectionChange?.(value);
      }
    },
    [onSelectionChange, selectionMode],
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
      orientation,
      onSelectionChange: handleSelectionChange,
      defaultSelectedKeys: finalDefaultSelectedKeys,
      selectedKeys: finalSelectedKeys,
    },
    state,
    ref,
  );

  const styles = buttonGroupStyles({ orientation });

  return (
    <div {...props} {...groupProps} className={styles.base({ className: className })} ref={ref}>
      <ToggleButtonGroupContext.Provider value={{ ...state, size, look, block, orientation }}>
        {children}
      </ToggleButtonGroupContext.Provider>
    </div>
  );
}
