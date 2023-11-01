'use client';

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';

import { Panel } from './components/panel/panel.component.js';
import { styles as popoverStyles } from './popover.styles.js';
import { type PopoverProps } from './popover.types.js';

/**
 * NOTE: This component does not use the react aria usePopover as it is opinionated
 * and doesn't match requirements for GEL popover
 */

export function Popover({
  children,
  className,
  headingTag,
  content,
  heading,
  onClick = () => undefined,
  placement,
  look,
  open = false,
  icon,
}: PopoverProps) {
  const state = useOverlayTriggerState({});
  const panelId = useId();
  const styles = popoverStyles({});
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onClick();
    state.toggle();
  }, [onClick, state.isOpen]);

  const keyHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (state.isOpen && event.key === 'Escape') state.close();
    },
    [state.isOpen],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
  }, [state.isOpen]);

  useLayoutEffect(() => {
    if (open) state.setOpen(true);
  }, [open]);
  return (
    <div className={styles.base({ className })}>
      <Button
        look={icon && !children ? 'link' : look}
        iconAfter={icon}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        onClick={handleClick}
        ref={ref}
      >
        {children}
      </Button>
      {state.isOpen && (
        <Panel
          placement={placement}
          heading={heading ? heading : ''}
          headingTag={headingTag}
          content={content}
          state={state}
          id={panelId}
          triggerRef={ref}
        />
      )}
    </div>
  );
}
