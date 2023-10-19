import { useAccordion } from '@react-aria/accordion';
import { filterDOMProps } from '@react-aria/utils';
import { useDOMRef } from '@react-spectrum/utils';
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { Item, useTreeState } from 'react-stately';

import { styles } from './accordion.styles.js';
import { type AccordionProps } from './accordion.types.js';
import { AccordionItem } from './components/index.js';

function Accordion<T extends object>(
  { className, rounded = true, look = 'soft', ...props }: AccordionProps<T>,
  ref: any,
) {
  // react-aria doesn't allow for now to use component children when there is multiple levels
  // in our case we don't need that functionality and we have to render html tags or components
  // therefore as a workaround we are setting hasChildItems false for all of them
  // https://github.com/adobe/react-spectrum/issues/3882
  const finalProps: any = {
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
  const state = useTreeState<T>(finalProps);
  const domRef = useDOMRef<HTMLDivElement>(ref);
  const { accordionProps } = useAccordion(finalProps, state, domRef);

  return (
    <div {...filterDOMProps(finalProps)} {...accordionProps} ref={domRef} className={styles({ className, rounded })}>
      <div className="mt-[-1px]">
        {[...state.collection].map(item => (
          <AccordionItem<T> key={item.key} item={item} state={state} look={look} />
        ))}
      </div>
    </div>
  );
}

const _Accordion = forwardRef(Accordion) as unknown as { Item: typeof Item; displayName: string } & (<T>(
  props: AccordionProps<T> & { ref?: any },
) => ReturnType<typeof Accordion>);

_Accordion.displayName = 'Accordion';
_Accordion.Item = Item;

export { _Accordion as Accordion };
