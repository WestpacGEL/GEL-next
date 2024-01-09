import React, { useRef } from 'react';
import { mergeProps, useFocusRing, useTabPanel } from 'react-aria';

import { styles } from './tabs-tab-panel.styles.js';
import { type TabsTabPanelProps } from './tabs-tab-panel.types.js';

export function TabsTabPanel({ className, state, look, ...props }: TabsTabPanelProps) {
  const ref = useRef(null);
  const { isFocused, focusProps } = useFocusRing();
  const { tabPanelProps } = useTabPanel({ ...props }, state, ref);
  return (
    <div {...mergeProps(tabPanelProps, focusProps)} ref={ref} className={styles({ className, look, isFocused })}>
      <div className="animate-fadeIn">{state.selectedItem?.props.children}</div>
    </div>
  );
}
TabsTabPanel.displayName = 'Tabs.Panel';
