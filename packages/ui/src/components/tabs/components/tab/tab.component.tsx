import React, { useRef } from 'react';
import { useTab } from 'react-aria';

import { styles } from './tab.styles.js';
import { type TabProps } from './tab.types.js';

export function Tab({ item: { key, rendered }, state, orientation, justify, color, look }: TabProps) {
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
  return (
    <div
      {...tabProps}
      className={styles({ selected: key === state.selectedKey, orientation, justify, color, look })}
      ref={ref}
    >
      {rendered}
    </div>
  );
}
