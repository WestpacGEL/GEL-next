'use client';

import { AnimatePresence, LazyMotion, m } from 'motion/react';
import React, { useMemo } from 'react';
import { FocusScope } from 'react-aria';

import { Button } from '../../../button/index.js';
import { IconProps, RemoveCircleIcon } from '../../../icon/index.js';
import { useRepeater } from '../../repeater.component.js';

import { styles as repeaterStyles } from './repeater-item.styles.js';
import { type RepeaterItemProps } from './repeater-item.types.js';

const loadAnimations = () => import('./repeater-item.utils.js').then(res => res.default);

export function RepeaterItem({
  className,
  children,
  titleTag: Tag = 'h3',
  onRemove,
  delay = 0,
  index,
  ...props
}: RepeaterItemProps) {
  const { totalItems, separator } = useRepeater();

  const styles = repeaterStyles({ separator, lastItem: index === totalItems - 1 });

  const counter = useMemo(() => (index || 0) + 1, [index]);

  return (
    <li className={styles.item()} {...props}>
      <LazyMotion features={loadAnimations}>
        <AnimatePresence>
          <m.div
            className={styles.collapsible()}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0], delay }}
          >
            {separator && <h3 className={styles.itemIndex()}>{counter}.</h3>}
            <FocusScope autoFocus restoreFocus>
              <div className={styles.content()}>{children}</div>
            </FocusScope>
            {onRemove && totalItems > 1 && (
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
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </li>
  );
}
