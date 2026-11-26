'use client';

import React, { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import { useToggleButtonGroup } from 'react-aria';
import { useToggleGroupState } from 'react-stately';

import { FocusHandle, useFocusManagerRef } from '../../hook/focus-manager-ref.hook.js';

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

function BaseButtonGroup(
  {
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
  }: ButtonGroupProps,
  // `ref.current.focus()` (e.g. react-hook-form focusing a field with a validation error) moves
  // focus to the first tabbable button in the group.
  forwardedRef: ForwardedRef<FocusHandle>,
) {
  const ref = useFocusManagerRef(forwardedRef);
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
    selectionMode,
    onSelectionChange: handleSelectionChange,
    defaultSelectedKeys: finalDefaultSelectedKeys,
    selectedKeys: finalSelectedKeys,
  });

  const { groupProps } = useToggleButtonGroup(
    {
      ...props,
      orientation,
      selectionMode,
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

export const ButtonGroup = forwardRef(BaseButtonGroup);
ButtonGroup.displayName = 'ButtonGroup';
