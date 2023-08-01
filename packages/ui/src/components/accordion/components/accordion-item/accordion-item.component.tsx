import { useAccordionItem } from '@react-aria/accordion';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import React, { useRef } from 'react';
import { mergeProps, useHover, useLocale } from 'react-aria';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../index.js';

import { styles as accordionItemStyles } from './accordion-item.styles.js';
import { type AccordionItemProps } from './accordion-item.types.js';

const loadAnimations = () => import('./accordion-item.utils.js').then(res => res.default);

export function AccordionItem<T = any>({ className, tag: Tag = 'div', color, ...props }: AccordionItemProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);
  const { state, item } = props;
  const { buttonProps, regionProps } = useAccordionItem<T>(props, state, ref);
  const isOpen = state.expandedKeys.has(item.key);
  const isDisabled = state.disabledKeys.has(item.key);
  const { hoverProps } = useHover({ isDisabled });
  const { direction } = useLocale();
  const styles = accordionItemStyles({ isOpen, isDisabled, className, color });

  return (
    <Tag className={styles.base()}>
      <h3>
        <button {...mergeProps(buttonProps, hoverProps)} ref={ref} className={styles.itemHeader()}>
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
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
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
