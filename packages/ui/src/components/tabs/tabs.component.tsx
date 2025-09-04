'use client';

import React, { useRef } from 'react';
import { AriaLinkOptions, Key, useTabList } from 'react-aria';
import { Item, ItemProps, useTabListState } from 'react-stately';

import { TabsTab, TabsTabPanel, TabsTabPanelProps } from './components/index.js';
import { styles as tabStyles } from './tabs.styles.js';
import { type TabsProps } from './tabs.types.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

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
  const breakpoint = useBreakpoint();
  const resolvedOrientation = resolveResponsiveVariant(orientation, breakpoint);
  const resolvedLook = resolveResponsiveVariant(look, breakpoint);
  const state = useTabListState({
    ...props,
    disabledKeys: disabledKeys as Iterable<Key>,
    selectedKey: selectedKey as Key,
    defaultSelectedKey: defaultSelectedKey as Key,
    children,
  });
  const styles = tabStyles({
    orientation: resolvedOrientation,
    look: resolvedLook,
    sticky: resolveResponsiveVariant(sticky, breakpoint),
  });

  const ref = useRef(null);
  const { tabListProps } = useTabList(
    {
      ...props,
      disabledKeys: disabledKeys as Iterable<Key>,
      selectedKey: selectedKey as Key,
      defaultSelectedKey: defaultSelectedKey as Key,
      orientation: resolvedOrientation,
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
            orientation={resolvedOrientation}
            justify={justify}
            color={color}
            look={resolvedLook}
          />
        ))}
      </div>

      {[...state.collection].map(item => (
        <TabsTabPanel
          look={resolvedLook}
          key={item.key}
          id={item.key as string}
          state={state}
          keepMounted={(item.props as TabsTabPanelProps)?.keepMounted}
        />
      ))}
    </div>
  );
}

export const TabsPanel = Item as (
  props: ItemProps<AriaLinkOptions> & AriaLinkOptions & { href?: string } & Omit<TabsTabPanelProps, 'state'>,
) => JSX.Element;
