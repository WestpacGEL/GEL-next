import React, { useRef } from 'react';
import { Key, mergeProps, useFocusRing, useTab } from 'react-aria';

import { styles } from './tabs-tab.styles.js';
import { type TabsTabProps } from './tabs-tab.types.js';

export function TabsTab({ item: { key, rendered }, state, orientation, justify, color, look }: TabsTabProps) {
  const ref = useRef(null);
  const { tabProps } = useTab({ key: key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <div
      {...mergeProps(tabProps, focusProps)}
      className={styles({ selected: key === state.selectedKey, orientation, justify, color, look, isFocusVisible })}
      ref={ref}
    >
      {rendered}
    </div>
  );
}
