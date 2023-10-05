import React, { useCallback, useEffect, useId } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';

import { Panel } from './components/panel/panel.component.js';
import { styles as popoverStyles } from './popover.styles.js';
import { type PopoverProps } from './popover.types.js';

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
  const state = useOverlayTriggerState({ defaultOpen: open });
  const panelId = useId();
  const styles = popoverStyles({});

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

  return (
    <div className={styles.base({ className })}>
      <Button
        look={icon && !children ? 'link' : look}
        iconAfter={icon}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        onClick={handleClick}
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
        />
      )}
    </div>
  );
}
