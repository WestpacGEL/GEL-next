'use client';

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';

import { Panel } from './components/panel/panel.component.js';
import { styles as popoverStyles } from './popover.styles.js';
import { type PopoverProps } from './popover.types.js';

/**
 * TODO: Revisit this component when react-aria has updated usePopover, see: https://github.com/adobe/react-spectrum/discussions/5341
 * This version does not currently use react-aria as it blocked so functionality that was needed to match GEL 3.0
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
  soft = false,
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
  }, [onClick, state]);

  const keyHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (state.isOpen && event.key === 'Escape') state.close();
    },
    [state],
  );

  useEffect(() => {
    window.document.addEventListener('keydown', keyHandler);
    return () => {
      window.document.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler, state.isOpen]);

  useLayoutEffect(() => {
    if (open) state.setOpen(true);
  }, [open, state]);
  return (
    <div className={styles.base({ className })}>
      <Button
        look={icon && !children ? 'link' : look}
        iconAfter={icon}
        soft={soft}
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
