'use client';

import { AnimatePresence, LazyMotion, m } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusRing } from 'react-aria';

import { generateID, resolveResponsiveVariant } from '../../utils/index.js';
import { Button } from '../button/index.js';
import { AddCircleIcon, IconProps, RemoveCircleIcon } from '../icon/index.js';
import { VisuallyHidden } from '../index.js';

import { styles as repeaterStyles } from './repeater.styles.js';
import { type RepeaterProps } from './repeater.types.js';
import { useBreakpoint } from '../../hook/breakpoints.hook.js';

type Action = {
  id?: string;
  index: number;
  type: string;
};

const loadAnimations = () => import('./repeater.utils.js').then(res => res.default);

export function Repeater({
  addText = 'Add another item',
  indexTag: ItemIndex = 'h3',
  children,
  separator = false,
  className,
}: RepeaterProps) {
  const breakpoint = useBreakpoint();
  const resolvedSeparator = resolveResponsiveVariant(separator, breakpoint);
  const [items, setItems] = useState([{ id: generateID() }]);
  const [action, setAction] = useState<Action>({ type: '', index: 0 });
  const [status, setStatus] = useState('');
  const refArr = useRef<HTMLElement[]>([]);
  const { isFocused, focusProps } = useFocusRing();

  const handleAdd = useCallback(() => {
    setItems([...items, { id: generateID() }]);
    setAction({ type: 'add', index: items.length });
  }, [items]);

  const handleRemove = useCallback(
    (id: string, index: number) => {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      setAction({ type: 'remove', index, id });
    },
    [items],
  );

  useEffect(() => {
    if (action.type === 'add') {
      refArr.current[items.length - 1]?.focus();
      setStatus(`Item added`);
    }

    if (action.type === 'remove') {
      refArr.current.splice(action.index, 1);
      const focusIndex = action.index === 0 ? 0 : action.index - 1;
      refArr.current[focusIndex]?.focus();
      setStatus(`Item ${action.index + 1} removed`);
    }
  }, [items.length, action]);

  const Tag = resolvedSeparator ? 'ol' : 'ul';
  const styles = repeaterStyles({ separator: resolvedSeparator, isFocused });

  return (
    <div className={styles.base({ className })}>
      <Tag className={styles.list()}>
        <LazyMotion features={loadAnimations}>
          <AnimatePresence>
            {items.map((item, index) => {
              return (
                <m.li
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  key={item.id}
                >
                  <div
                    ref={(el: HTMLDivElement) => {
                      refArr.current[index] = el;
                    }}
                    tabIndex={-1}
                    className={styles.item()}
                    {...focusProps}
                  >
                    {resolvedSeparator && <ItemIndex className={styles.itemIndex()}>{index + 1}.</ItemIndex>}
                    <div className={styles.content()}>{children}</div>
                    {items.length > 1 && (
                      <Button
                        className={styles.removeBtn()}
                        aria-label={`remove item ${index + 1}`}
                        iconBefore={(props: IconProps) => (
                          <RemoveCircleIcon {...props} aria-hidden look="outlined" size="xsmall" />
                        )}
                        look="link"
                        size="small"
                        soft
                        onClick={() => handleRemove(item.id, index)}
                        type="button"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </m.li>
              );
            })}
          </AnimatePresence>
        </LazyMotion>
      </Tag>
      <div className={styles.footer()}>
        <Button
          className={styles.addBtn()}
          iconBefore={(props: IconProps) => <AddCircleIcon {...props} aria-hidden look="outlined" />}
          look="link"
          size="small"
          soft
          onClick={() => handleAdd()}
          type="button"
        >
          {addText}
        </Button>
      </div>
      <VisuallyHidden role="status">{status}</VisuallyHidden>
    </div>
  );
}
