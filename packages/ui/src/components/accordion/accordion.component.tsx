'use client';

import React from 'react';
import { DisclosureGroupState, useDisclosureGroupState } from 'react-stately';

import { styles } from './accordion.styles.js';
import { Variants, type AccordionProps } from './accordion.types.js';
import { AccordionItemProps } from './components/index.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

export const AccordionContext = React.createContext<
  ({ look: AccordionItemProps['look']; rounded: Variants['rounded'] } & DisclosureGroupState) | null
>(null);

export function Accordion({ className, rounded = true, look = 'soft', ...props }: AccordionProps) {
  // Sets multiple expanded to true as that is original functionality
  const state = useDisclosureGroupState({ ...props, allowsMultipleExpanded: true });
  const breakpoint = useBreakpoint();
  const resolvedRounded = resolveResponsiveVariant(rounded, breakpoint);

  return (
    <div className={styles({ className, rounded: resolvedRounded })}>
      <AccordionContext.Provider value={{ look: resolveResponsiveVariant(look, breakpoint), rounded: resolvedRounded, ...state }}>
        <div>{props.children}</div>
      </AccordionContext.Provider>
    </div>
  );
}
