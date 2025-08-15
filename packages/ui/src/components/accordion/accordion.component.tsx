'use client';

import React from 'react';
import { DisclosureGroupState, useDisclosureGroupState } from 'react-stately';

import { styles } from './accordion.styles.js';
import { type AccordionProps } from './accordion.types.js';
import { AccordionItemProps } from './components/index.js';

export const AccordionContext = React.createContext<
  ({ look: AccordionItemProps['look']; rounded: AccordionProps['rounded'] } & DisclosureGroupState) | null
>(null);

export function Accordion({ className, rounded = true, look = 'soft', ...props }: AccordionProps) {
  // Sets multiple expanded to true as that is original functionality
  const state = useDisclosureGroupState({ ...props, allowsMultipleExpanded: true });

  return (
    <div className={styles({ className, rounded })}>
      <AccordionContext.Provider value={{ look, rounded, ...state }}>
        <div>{props.children}</div>
      </AccordionContext.Provider>
    </div>
  );
}
