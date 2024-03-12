'use client';

import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { filterDOMProps } from '@react-aria/utils';
import { useDOMRef } from '@react-spectrum/utils';
import { DOMProps, DOMRef } from '@react-types/shared';
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { Item, type ItemProps, TreeProps, useTreeState } from 'react-stately';

import { styles } from './accordion.styles.js';
import { type AccordionProps } from './accordion.types.js';
import { AccordionItem as AccordionItemContent } from './components/index.js';

function Accordion<T extends object>(
  { className, rounded = true, look = 'soft', ...props }: AccordionProps<T>,
  ref: DOMRef<HTMLDivElement>,
) {
  // react-aria doesn't allow for now to use component children when there is multiple levels
  // in our case we don't need that functionality and we have to render html tags or components
  // therefore as a workaround we are setting hasChildItems false for all of them
  // https://github.com/adobe/react-spectrum/issues/3882
  const finalProps = {
    ...props,
    children: Children.map(props.children, child => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!isValidElement(child)) return child;
      return cloneElement(child, {
        ...child.props,
        // Adding hasChildItems false by default
        hasChildItems: false,
      });
    }),
  };
  const state = useTreeState<T>(finalProps as TreeProps<T>);
  const domRef = useDOMRef<HTMLDivElement>(ref);
  const { accordionProps } = useAccordion(finalProps as AriaAccordionProps<T>, state, domRef);

  return (
    <div
      {...filterDOMProps(finalProps as DOMProps)}
      {...accordionProps}
      ref={domRef}
      className={styles({ className, rounded })}
    >
      <div className="ml-[-1px] mt-[-1px]">
        {[...state.collection].map(item => (
          <AccordionItemContent<T> key={item.key} item={item} state={state} look={look} />
        ))}
      </div>
    </div>
  );
}

const _Accordion = forwardRef(Accordion) as unknown as { displayName: string } & (<T>(
  props: AccordionProps<T> & { ref?: HTMLElement },
) => ReturnType<typeof Accordion>);

_Accordion.displayName = 'Accordion';

export { _Accordion as Accordion };
export const AccordionItem: <T>(props: ItemProps<T>) => JSX.Element = Item;
