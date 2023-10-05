import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import { generateID } from '../../utils/index.js';
import { Button } from '../button/index.js';
import { AddCircleIcon, ExpandLessIcon, ExpandMoreIcon, IconProps, RemoveCircleIcon } from '../icon/index.js';
import { VisuallyHidden } from '../index.js';

import { styles as compactaStyles } from './compacta.styles.js';
import { type CompactaProps } from './compacta.types.js';

interface Action {
  id?: string;
  index: number;
  type: string;
}

const loadAnimations = () => import('./compacta.utils.js').then(res => res.default);

export function Compacta({
  className,
  children,
  titleTag: Tag = 'h3',
  addText = 'Add another',
  ...props
}: CompactaProps) {
  const [initial, setInitial] = useState(true);
  const id = useId();
  const [items, setItems] = useState([
    { id, open: true, delay: false, title: { primary: '', secondary: '', tertiary: '' } },
  ]);
  const [action, setAction] = useState<Action>({ type: '', index: 0 });
  const [status, setStatus] = useState('');
  const headingRefs = useRef<HTMLElement[]>([]);
  const toggleRefs = useRef<HTMLElement[]>([]);

  const handleAdd = useCallback(() => {
    let delay = false;
    const newItems = items.map((item, index) => {
      if (index === items.length - 1) {
        if (item.open) {
          delay = true;
        }
        return {
          ...item,
          open: false,
          delay: false,
        };
      }
      return item;
    });

    setItems([
      ...newItems,
      {
        id: `${id}-${generateID()}`,
        open: true,
        delay,
        title: { primary: '', secondary: '', tertiary: '' },
      },
    ]);

    setAction({ type: 'add', index: newItems.length });
  }, [id, items]);

  const handleRemove = useCallback((id: string, index: number) => {
    setItems(items => items.filter(item => item.id !== id));
    setAction({ type: 'remove', index, id });
  }, []);

  const handleToggle = useCallback(
    (id: string, index: number) => {
      if (initial) setInitial(false);
      setItems(items => items.map(item => (item.id === id ? { ...item, delay: false, open: !item.open } : item)));
      setAction({ type: 'toggle', index });
    },
    [initial],
  );

  const setTitle = useCallback((id: string, titleType: string, title: string) => {
    setItems(items =>
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title: { ...item.title, [titleType]: title },
          };
        } else {
          return item;
        }
      }),
    );
  }, []);

  useEffect(() => {
    if (action.type) {
      if (action.type === 'add') {
        setTimeout(() => {
          headingRefs?.current[action.index]?.focus();
        }, 1);
        setStatus(`Item added`);
      }

      if (action.type === 'remove') {
        headingRefs.current.splice(action.index, 1);
        const focusIndex = action.index === 0 ? 0 : action.index - 1;
        setTimeout(() => {
          headingRefs?.current[focusIndex]?.focus();
        }, 1);
        setStatus(`Item ${action.index + 1} removed`);
      }

      if (action.type === 'toggle') {
        toggleRefs?.current[action.index]?.focus();
      }
    }
  }, [items.length, action]);

  const styles = compactaStyles({});

  return (
    <div className={styles.base({ className })} {...props}>
      {items.map((item, index) => {
        return (
          <div className={styles.item()} key={item.id}>
            <div className={styles.header()}>
              <div className={styles.headerTitle()}>
                <Tag
                  className={styles.primaryHeading()}
                  ref={(el: HTMLDivElement) => {
                    headingRefs.current[index] = el;
                  }}
                  id={`gel-compacta-title-${item.id}`}
                  tabIndex={-1}
                >
                  <div className={styles.itemIndex()}>{index + 1}.</div>
                  {!item.open && item.title.primary && (
                    <div className={styles.titlePrimary()}>{item.title.primary}</div>
                  )}
                </Tag>
                <Button
                  className={styles.toggleBtn()}
                  iconAfter={item.open ? ExpandLessIcon : ExpandMoreIcon}
                  look="link"
                  size="large"
                  onClick={() => handleToggle(item.id, index)}
                  ref={(el: HTMLElement) => {
                    toggleRefs.current[index] = el;
                  }}
                  aria-labelledby={`gel-compacta-title-${item.id}`}
                  aria-expanded={item.open}
                  aria-controls={`gel-compacta-content-${item.id}`}
                />
              </div>
              {!item.open && (
                <div className={styles.secondaryHeading()}>
                  {item.title.secondary && <div className={styles.titleSecondary()}>{item.title.secondary}</div>}
                  {item.title.tertiary && <div className={styles.titleTertiary()}>{item.title.tertiary}</div>}
                </div>
              )}
            </div>
            <LazyMotion features={loadAnimations}>
              <AnimatePresence>
                {item.open && (
                  <m.div
                    className={styles.collapsible()}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0], delay: item.delay ? 0.3 : 0 }}
                    id={`gel-compacta-collapsible-${item.id}`}
                    aria-hidden={!item.open}
                  >
                    <div className={styles.content()} id={`gel-compacta-content-${item.id}`}>
                      {children({
                        id: item.id,
                        setPrimaryTitle: (title: string) => setTitle(item.id, 'primary', title),
                        setSecondaryTitle: (title: string) => setTitle(item.id, 'secondary', title),
                        setTertiaryTitle: (title: string) => setTitle(item.id, 'tertiary', title),
                      })}
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
                      >
                        Remove
                      </Button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </LazyMotion>
          </div>
        );
      })}
      <div className={styles.footer()}>
        <Button
          className={styles.addBtn()}
          iconBefore={(props: IconProps) => <AddCircleIcon {...props} aria-hidden look="outlined" />}
          look="link"
          size="small"
          soft
          onClick={() => handleAdd()}
        >
          {addText}
        </Button>
      </div>
      <VisuallyHidden role="status">{status}</VisuallyHidden>
    </div>
  );
}
