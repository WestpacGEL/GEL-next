'use client';

import React, { useRef } from 'react';
import { AriaLinkOptions, Key, useTabList } from 'react-aria';
import { Item, ItemProps, useTabListState } from 'react-stately';

import { TabsTab, TabsTabPanel, TabsTabPanelProps } from './components/index.js';
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
  disabledKeys,
  selectedKey,
  defaultSelectedKey,
  ...props
}: TabsProps) {
  const state = useTabListState({
    ...props,
    disabledKeys: disabledKeys as Iterable<Key>,
    selectedKey: selectedKey as Key,
    defaultSelectedKey: defaultSelectedKey as Key,
    children,
  });
  const styles = tabStyles({ orientation, look, sticky });

  const ref = useRef(null);
  const { tabListProps } = useTabList(
    {
      ...props,
      disabledKeys: disabledKeys as Iterable<Key>,
      selectedKey: selectedKey as Key,
      defaultSelectedKey: defaultSelectedKey as Key,
      orientation,
    },
    state,
    ref,
  );
  return (
    <div className={styles.base({ className })}>
      <div style={{ ...tabListProps.style, ...stickyOffset }} {...tabListProps} className={styles.tabList()} ref={ref}>
        {[...state.collection].map(item => (
          <TabsTab
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

      {[...state.collection].map(item => (
        <TabsTabPanel look={look} id={item.key as string} state={state} keepMounted={item.props['keepMounted']} />
      ))}
    </div>
  );
}

export const TabsPanel = Item as (
  props: ItemProps<AriaLinkOptions> & AriaLinkOptions & { href?: string } & Omit<TabsTabPanelProps, 'state'>,
) => JSX.Element;
