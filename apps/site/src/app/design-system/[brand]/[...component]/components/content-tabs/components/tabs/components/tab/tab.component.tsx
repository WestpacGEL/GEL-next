import { useRef } from 'react';
import { AriaTabProps, mergeProps, useFocusRing, useTab } from 'react-aria';
import { Node, TabListState } from 'react-stately';

import { styles } from './tab.styles';

export function Tab({ item, state }: { item: Node<AriaTabProps>; state: TabListState<AriaTabProps> }) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { tabProps } = useTab({ key: key as string | number }, state, ref);
  const selected = key === state.selectedKey;
  return (
    <div {...mergeProps(tabProps, focusProps)} ref={ref} className={styles({ selected, isFocusVisible })}>
      {rendered}
    </div>
  );
}
