import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import React, { useCallback, useId, useState } from 'react';

import { Button } from '../button/index.js';
import { ExpandLessIcon, ExpandMoreIcon, IconProps } from '../icon/index.js';

import { styles as collapsibleStyles } from './collapsible.styles.js';
import { type CollapsibleProps } from './collapsible.types.js';

const loadAnimations = () => import('./collapsible.utils.js').then(res => res.default);

export function Collapsible({
  className,
  children,
  open = false,
  text,
  size = 'medium',
  onClick = () => undefined,
}: CollapsibleProps) {
  const [contentOpen, setContentOpen] = useState(open);
  const contentId = useId();

  const ButtonIcon = (props: IconProps) => {
    if (!contentOpen) return <ExpandMoreIcon color="link" {...props} />;
    return <ExpandLessIcon color="link" {...props} />;
  };

  const handleClick = useCallback(() => {
    onClick();
    setContentOpen(contentOpen => !contentOpen);
  }, [contentOpen]);

  const styles = collapsibleStyles({ open: contentOpen });

  return (
    <>
      <Button
        className={styles.base({ className })}
        look="link"
        iconAfter={ButtonIcon}
        onClick={handleClick}
        size={size}
        aria-expanded={contentOpen}
        aria-controls={contentId}
      >
        {text}
      </Button>
      <LazyMotion features={loadAnimations}>
        <AnimatePresence>
          {contentOpen && (
            <m.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className={styles.content()}
              id={contentId}
              aria-hidden={!contentOpen}
            >
              {children}
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
