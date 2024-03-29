import { useAccordionItem } from '@react-aria/accordion';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import React, { useRef } from 'react';
import { Key, mergeProps, useFocusRing, useHover, useLocale } from 'react-aria';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';

import { styles as accordionItemStyles } from './accordion-item.styles.js';
import { type AccordionItemProps } from './accordion-item.types.js';

const loadAnimations = () => import('./accordion-item.utils.js').then(res => res.default);

export function AccordionItem<T = HTMLElement>({
  className,
  tag: Tag = 'div',
  look = 'soft',
  ...props
}: AccordionItemProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);
  const { state, item } = props;
  const { buttonProps, regionProps } = useAccordionItem<T>(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isOpen = state.expandedKeys.has(item.key as Key);
  const isDisabled = state.disabledKeys.has(item.key as Key);
  const { hoverProps } = useHover({ isDisabled });
  const { direction } = useLocale();
  const styles = accordionItemStyles({ isOpen, isDisabled, look, isFocusVisible });

  return (
    <Tag className={styles.base({ className })}>
      {/*
        Using h3 tag since the official page is using it, also the react-spectrum
        https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
      */}
      <h3>
        <button {...mergeProps(buttonProps, hoverProps, focusProps)} ref={ref} className={styles.itemHeader()}>
          <span>{item.props.title}</span>
          {direction === 'ltr' ? (
            <ArrowRightIcon aria-hidden="true" className={styles.indicator()} />
          ) : (
            <ArrowLeftIcon aria-hidden="true" className={styles.indicator()} />
          )}
        </button>
      </h3>
      <div {...regionProps}>
        <LazyMotion features={loadAnimations}>
          <AnimatePresence initial={false}>
            {isOpen && (
              <m.div
                className="overflow-hidden"
                initial={{
                  height: 0,
                }}
                animate={{
                  height: 'auto',
                }}
                exit={{
                  height: 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <div className={styles.content()}>{item.props.children}</div>
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </Tag>
  );
}
