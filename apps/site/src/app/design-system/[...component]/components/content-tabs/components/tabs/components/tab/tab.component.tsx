import { useRef } from 'react';
import { AriaTabProps, useTab } from 'react-aria';
import { Node, TabListState } from 'react-stately';

import { styles } from './tab.styles';

export function Tab({ item, state }: { item: Node<AriaTabProps>; state: TabListState<AriaTabProps> }) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
  const selected = key === state.selectedKey;
  return (
    <div {...tabProps} ref={ref} className={styles({ selected })}>
      {rendered}
    </div>
  );
}
