import React, { useRef } from 'react';
import { useTab } from 'react-aria';

import { type TabProps } from './tab.types.js';

export function Tab({ item, state }: TabProps) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
  return (
    <div {...tabProps} ref={ref}>
      {rendered}
    </div>
  );
}
