import React, { useRef } from 'react';
import { useTabPanel } from 'react-aria';

import { styles } from './tab-panel.styles.js';
import { type TabPanelProps } from './tab-panel.types.js';

export function TabPanel({ className, state, look, ...props }: TabPanelProps) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel({ ...props }, state, ref);
  return (
    <div {...tabPanelProps} ref={ref} className={styles({ className, look })}>
      {state.selectedItem?.props.children}
    </div>
  );
}
