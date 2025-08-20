'use client';

import { AnimatePresence, LazyMotion, m } from 'motion/react';
import React, { useMemo, useEffect } from 'react';
import { mergeProps, useButton, useDisclosure, useFocusRing, useHover, useId, useLocale } from 'react-aria';
import { useDisclosureState } from 'react-stately';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';
import { AccordionContext } from '../../accordion.component.js';

import { styles as accordionItemStyles } from './accordion-item.styles.js';
import { type AccordionItemProps } from './accordion-item.types.js';

const loadAnimations = () => import('./accordion-item.utils.js').then(res => res.default);

export function AccordionItem({ className, tag: Tag = 'div', children, ...props }: AccordionItemProps) {
  const defaultId = useId();
  const id = props.id || defaultId;
  const groupState = React.useContext(AccordionContext);
  const isExpanded = groupState ? groupState.expandedKeys.has(id) : props.isExpanded;

  const state = useDisclosureState({
    ...props,
    isExpanded,
    onExpandedChange(isExpanded) {
      if (groupState) {
        groupState.toggleKey(id);
      }
      props.onExpandedChange?.(isExpanded);
    },
  });

  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const isDisabled = props.isDisabled || groupState?.isDisabled || false;
  const { buttonProps: triggerProps, panelProps } = useDisclosure(
    { ...props, isExpanded, isDisabled },
    state,
    panelRef,
  );
  const { buttonProps } = useButton(triggerProps, triggerRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps } = useHover({ isDisabled });
  const { direction } = useLocale();
  const styles = accordionItemStyles({
    isOpen: isExpanded,
    isDisabled,
    look: groupState?.look,
    rounded: groupState?.rounded,
    isFocusVisible,
  });

  useEffect(() => {
    // There was an issue with exit animations for closing an accordion that adding this fixed
    panelRef.current?.removeAttribute('hidden');
  }, [isExpanded]);

  return (
    <Tag className={styles.base({ className })}>
      {/*
        Using h3 tag since the official page is using it, also the react-spectrum
        https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
      */}
      <h3>
        <button {...mergeProps(buttonProps, hoverProps, focusProps)} ref={triggerRef} className={styles.itemHeader()}>
          <span className={styles.headerTitleWrapper()}>{props.title}</span>
          {direction === 'ltr' ? (
            <ArrowRightIcon color="muted-vivid" aria-hidden="true" className={styles.indicator()} />
          ) : (
            <ArrowLeftIcon color="muted-vivid" aria-hidden="true" className={styles.indicator()} />
          )}
        </button>
      </h3>
      <div ref={panelRef} {...panelProps}>
        <LazyMotion features={loadAnimations}>
          <AnimatePresence initial={false}>
            {isExpanded && (
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
                key={id}
              >
                <div className={styles.content()}>{children}</div>
              </m.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </Tag>
  );
}
