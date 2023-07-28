import React, { useRef } from 'react';
import { useTabList } from 'react-aria';
import { Item, useTabListState } from 'react-stately';

import { Tab, TabPanel } from './components/index.js';
import { styles } from './tabs.styles.js';
import { type TabsProps } from './tabs.types.js';

export function Tabs({ className, orientation, tag: Tag = 'div', children, ...props }: TabsProps) {
  const state = useTabListState({ ...props, children, orientation, className });
  const ref = useRef(null);
  const { tabListProps } = useTabList({ ...props, orientation }, state, ref);
  return (
    <div className={styles({ className, orientation })}>
      <div {...tabListProps} ref={ref}>
        {[...state.collection].map(item => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}
Tabs.Panel = Item;
