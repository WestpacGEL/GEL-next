import React, { useRef } from 'react';
import { mergeProps, useFocusRing, useTab } from 'react-aria';

import { styles } from './tab.styles.js';
import { type TabProps } from './tab.types.js';

export function Tab({ item: { key, rendered }, state, orientation, justify, color, look }: TabProps) {
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
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
