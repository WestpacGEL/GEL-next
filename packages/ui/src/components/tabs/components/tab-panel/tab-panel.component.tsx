import React, { useRef } from 'react';
import { mergeProps, useFocusRing, useTabPanel } from 'react-aria';

import { styles } from './tab-panel.styles.js';
import { type TabPanelProps } from './tab-panel.types.js';

export function TabPanel({ className, state, look, ...props }: TabPanelProps) {
  const ref = useRef(null);
  const { isFocused, focusProps } = useFocusRing();
  const { tabPanelProps } = useTabPanel({ ...props }, state, ref);
  return (
    <div {...mergeProps(tabPanelProps, focusProps)} ref={ref} className={styles({ className, look, isFocused })}>
      <div className="animate-fadeIn">{state.selectedItem?.props.children}</div>
    </div>
  );
}
TabPanel.displayName = 'Tabs.Panel';
