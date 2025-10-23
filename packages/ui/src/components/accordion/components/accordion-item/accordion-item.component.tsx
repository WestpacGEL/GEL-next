/* eslint-disable sonarjs/deprecation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAccordionItem } from '@react-aria/accordion';
import { LazyMotion, m, useAnimate } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { mergeProps, useFocusRing, useHover, useLocale } from 'react-aria';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';

import { styles as accordionItemStyles } from './accordion-item.styles.js';
import { type AccordionItemProps } from './accordion-item.types.js';

const loadAnimations = () => import('./accordion-item.utils.js').then(res => res.default);

export function AccordionItem<T = HTMLElement>({
  className,
  tag: Tag = 'div',
  look = 'soft',
  rounded = true,
  ...props
}: AccordionItemProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);
  const { state, item } = props;
  const { buttonProps, regionProps } = useAccordionItem<T>(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const isOpenState = state.expandedKeys.has(item.key);
  const isDisabled = state.disabledKeys.has(item.key);
  const { hoverProps } = useHover({ isDisabled });
  const { direction } = useLocale();
  // Open/close animation needs to be done with useAnimate as AnimatePresence will unmount component
  const [scope, animate] = useAnimate();
  const [enableOpenStyle, setEnableOpenStyle] = useState(isOpenState); // styles for opening accordion
  const [enableCloseStyle, setEnableCloseStyle] = useState(!isOpenState); // styles for closing accordion

  const styles = accordionItemStyles({
    isOpen: enableOpenStyle,
    isClosed: enableCloseStyle,
    isOpenState,
    isDisabled,
    look,
    isFocusVisible,
    rounded,
  });

  useEffect(() => {
    // setEnableStyle here as opening animation isn't working correctly if done below
    if (isOpenState) setEnableOpenStyle(true);

    // animates opening accordion
    if (enableOpenStyle) {
      animate(
        scope.current,
        { height: 'auto' },
        { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0], onComplete: () => setEnableCloseStyle(false) },
      );
    }

    // animates closing accordion
    if (!isOpenState) {
      animate(
        scope.current,
        { height: '0px' },
        {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0],
          // set some styles after animation completes so content doesn't disappear on close
          onPlay: () => {
            setEnableCloseStyle(true);
          },
          onComplete: () => {
            setEnableOpenStyle(false);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenState, enableOpenStyle]);

  return (
    <Tag className={styles.base({ className })}>
      {/*
        Using h3 tag since the official page is using it, also the react-spectrum
        https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
      */}
      <h3>
        <button {...mergeProps(buttonProps, hoverProps, focusProps)} ref={ref} className={styles.itemHeader()}>
          <span className={styles.headerTitleWrapper()}>{item.props.title}</span>
          {direction === 'ltr' ? (
            <ArrowRightIcon aria-hidden="true" className={styles.indicator()} />
          ) : (
            <ArrowLeftIcon aria-hidden="true" className={styles.indicator()} />
          )}
        </button>
      </h3>
      <div {...regionProps}>
        {/* NOTE: Can potentially replace animation in the future with React 19.2 Activity and AnimateActivity from motion/react once fully released https://motion.dev/docs/react-animate-activity */}
        <LazyMotion features={loadAnimations}>
          <m.div className={styles.motionContent()} initial={{ height: isOpenState ? 'auto' : 0 }} ref={scope}>
            <div
              className={styles.content()}
              // TODO: Remove below with updated accordion that uses disclosure as the issue doesn't happen with that version
              // Need to call stopPropagation here as some events from children are bubbling up and focusing the accordion i.e. inputs
              onBlur={e => {
                e.stopPropagation();
              }}
              onFocus={e => {
                e.stopPropagation();
              }}
            >
              {item.props.children}
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </Tag>
  );
}
