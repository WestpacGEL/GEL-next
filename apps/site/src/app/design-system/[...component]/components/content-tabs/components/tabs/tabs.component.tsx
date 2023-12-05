'use client';

import { useRef } from 'react';
import { AriaTabListProps, AriaTabProps, useTabList } from 'react-aria';
import { Item, useTabListState } from 'react-stately';

import { StickyHeader } from '@/components/sticky-header';

import { Tab, TabPanel } from './components';

const HEADER_OFFSET = 66;

export function Tabs(props: AriaTabListProps<AriaTabProps>) {
  const state = useTabListState(props);
  const ref = useRef(null);
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <div>
      <StickyHeader stickyPosition={HEADER_OFFSET} className="top-[4.125rem]">
        <div {...tabListProps} ref={ref} className="flex h-11 items-end bg-white sm:h-[5.625rem]">
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
