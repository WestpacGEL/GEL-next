'use client';

import React, { useEffect, useState } from 'react';
import { mergeProps, useButton, useDisclosure, useFocusRing, useHover, useId, useLocale } from 'react-aria';
import { useDisclosureState } from 'react-stately';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';
import { AccordionContext } from '../../accordion.component.js';

import { styles as accordionItemStyles } from './accordion-item.styles.js';
import { type AccordionItemProps } from './accordion-item.types.js';

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
  const [overflowVisible, setOverflowVisible] = useState(false);

  const styles = accordionItemStyles({
    isExpanded,
    isDisabled,
    look: groupState?.look,
    rounded: groupState?.rounded,
    isFocusVisible,
  });

  useEffect(() => {
    // hides overflow again when collapsing
    if (!isExpanded) setOverflowVisible(false);
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
      <div
        ref={panelRef}
        {...panelProps}
        className={styles.panel()}
        // when open shows overflow for things like popover, datepicker, etc. Overflow hidden for animation
        style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
        onTransitionEnd={() => {
          if (isExpanded) {
            setOverflowVisible(true);
          }
        }}
      >
        <div className={styles.content()}>{children}</div>
      </div>
    </Tag>
  );
}
