'use client';

import { AnimatePresence, LazyMotion, m } from 'motion/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useButton, useDisclosure, mergeProps, useFocusRing, FocusScope } from 'react-aria';
import { useDisclosureState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { ExpandLessIcon, ExpandMoreIcon, IconProps, RemoveCircleIcon } from '../../../icon/index.js';
import { useCompacta } from '../../compacta.component.js';

import { styles as compactaStyles } from './compacta-item.styles.js';
import { type CompactaItemProps } from './compacta-item.types.js';

const loadAnimations = () => import('./compacta-item.utils.js').then(res => res.default);

export function CompactaItem({
  className,
  children,
  titleTag: Tag = 'h3',
  onRemove,
  delay = 0,
  title,
  index,
  expandOnMount = true,
  ...props
}: CompactaItemProps) {
  const { totalItems } = useCompacta();
  const state = useDisclosureState(props);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { buttonProps: triggerProps, panelProps } = useDisclosure(props, state, panelRef);
  const { buttonProps } = useButton(triggerProps, triggerRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = compactaStyles({ isFocusVisible });

  useEffect(() => {
    if (expandOnMount) {
      state.setExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const secondLastIndex = totalItems - 2;
    if (index === secondLastIndex) {
      state.setExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  const counter = useMemo(() => (index || 0) + 1, [index]);

  return (
    <div className={styles.item({ className })} {...props}>
      <div className={styles.header()}>
        <div className={styles.headerTitle()}>
          <Tag className={styles.primaryHeading()}>
            <div className={styles.itemIndex()}>{counter}.</div>
            {!state.isExpanded && title?.primary && <div className={styles.titlePrimary()}>{title?.primary}</div>}
          </Tag>
          <Button
            className={styles.toggleBtn()}
            iconAfter={state.isExpanded ? ExpandLessIcon : ExpandMoreIcon}
            iconColor="primary"
            look="link"
            size="large"
            aria-label={state.isExpanded ? `Collapse ${counter}` : `Expand ${counter}`}
            {...mergeProps(buttonProps, focusProps)}
          />
        </div>
        {!state.isExpanded && (
          <div className={styles.secondaryHeading()}>
            {!!title?.secondary && <div className={styles.titleSecondary()}>{title?.secondary}</div>}
            {!!title?.tertiary && <div className={styles.titleTertiary()}>{title?.tertiary}</div>}
          </div>
        )}
      </div>
      <LazyMotion features={loadAnimations}>
        <AnimatePresence>
          {state.isExpanded && (
            <m.div
              className={styles.collapsible()}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0], delay }}
              aria-hidden={!state.isExpanded}
            >
              <FocusScope autoFocus restoreFocus>
                <div className={styles.content()} ref={panelRef} {...panelProps}>
                  {children}
                  {onRemove && (
                    <Button
                      type="button"
                      className={styles.removeBtn()}
                      iconBefore={(props: IconProps) => (
                        <RemoveCircleIcon {...props} aria-hidden look="outlined" size="xsmall" />
                      )}
                      look="link"
                      size="small"
                      soft
                      onClick={() => onRemove()}
                      aria-label={`Remove item ${counter}`}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </FocusScope>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
