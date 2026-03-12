/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from 'react';
import { mergeProps, useFocusRing, useTabPanel } from 'react-aria';

import { styles } from './tabs-tab-panel.styles.js';
import { type TabsTabPanelProps } from './tabs-tab-panel.types.js';

export function TabsTabPanel({
  className,
  state,
  look,
  id,
  keepMounted = false,
  justify,
  orientation,
  ...props
}: TabsTabPanelProps) {
  const ref = useRef(null);
  const { isFocused, focusProps } = useFocusRing();
  const { tabPanelProps } = useTabPanel({ ...props }, state, ref);

  const isSelected = state.selectedItem?.key === id;

  // if not selected and panel does not needto be retained in DOM, return null
  if (!isSelected && !keepMounted) {
    return null;
  }
  return (
    <div
      {...mergeProps(tabPanelProps, focusProps)}
      ref={ref}
      className={styles({ className, look, isFocused, justify, orientation })}
      hidden={!isSelected}
      aria-hidden={!isSelected}
    >
      <div className="animate-fadeIn">{state.selectedItem?.props.children}</div>
    </div>
  );
}
TabsTabPanel.displayName = 'TabsPanel';
