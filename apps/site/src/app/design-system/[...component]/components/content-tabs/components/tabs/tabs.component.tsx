'use client';

import { useRef } from 'react';
import { AriaTabListProps, AriaTabProps, useTab, useTabList, useTabPanel } from 'react-aria';
import { Item, Node, TabListState, useTabListState } from 'react-stately';

import { StickyHeader } from '@/components/sticky-header';

import { styles } from './tabs.styles';

export function Tabs(props: AriaTabListProps<AriaTabProps>) {
  const state = useTabListState(props);
  const ref = useRef(null);
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <div>
      <StickyHeader stickyPosition={66} className="top-11">
        <div {...tabListProps} ref={ref} className="flex h-11 items-end bg-white sm:h-15">
          {[...state.collection].map(item => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </StickyHeader>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

Tabs.Panel = Item;

function Tab({ item, state }: { item: Node<AriaTabProps>; state: TabListState<AriaTabProps> }) {
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

function TabPanel({ state, ...props }: { state: TabListState<AriaTabProps> }) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}
