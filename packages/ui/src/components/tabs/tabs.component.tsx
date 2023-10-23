'use client';

import React, { useRef } from 'react';
import { useTabList } from 'react-aria';
import { Item, useTabListState } from 'react-stately';

import { Tab, TabPanel } from './components/index.js';
import { styles as tabStyles } from './tabs.styles.js';
import { type TabsProps } from './tabs.types.js';

export function Tabs({
  className,
  orientation = 'horizontal',
  justify,
  children,
  color,
  look = 'default',
  sticky = false,
  stickyOffset = {},
  ...props
}: TabsProps) {
  const state = useTabListState({ ...props, children });
  const styles = tabStyles({ orientation, look, sticky });

  const ref = useRef(null);
  const { tabListProps } = useTabList({ ...props, orientation }, state, ref);
  return (
    <div className={styles.base({ className })}>
      <div style={{ ...tabListProps.style, ...stickyOffset }} {...tabListProps} className={styles.tabList()} ref={ref}>
        {[...state.collection].map(item => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            orientation={orientation}
            justify={justify}
            color={color}
            look={look}
          />
        ))}
      </div>
      <TabPanel look={look} key={state.selectedItem?.key} state={state} />
    </div>
  );
}
Tabs.Panel = Item;
