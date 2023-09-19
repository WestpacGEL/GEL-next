import React, { KeyboardEvent, useCallback, useEffect, useId, useRef } from 'react';
import { FocusScope, useButton, useFocusManager, useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';

import { Dialog } from './components/dialog/dialog.component.js';
import { Panel } from './components/panel/panel.component.js';
import { styles as popoverStyles } from './popover.styles.js';
import { type PopoverProps } from './popover.types.js';
/**
 * TODO: Component not complete, see panel component for functionality specific to that component that must be completed
 */
export function Popover({ label, children, heading, placement, look, iconAfter, ...props }: PopoverProps) {
  const ref = useRef(null);
  const state = useOverlayTriggerState(props);
  const { overlayProps, triggerProps } = useOverlayTrigger({ type: 'dialog' }, state, ref);
  const { buttonProps } = useButton(triggerProps, ref);
  const panelId = useId();
  const styles = popoverStyles({});

  // React Aria does not check for escape key press unless panel is focused so this is needed
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
    <div>
      <Button
        look={iconAfter ? 'link' : look}
        iconAfter={iconAfter}
        ref={ref}
        className={styles.button()}
        aria-expanded={state.isOpen}
        aria-controls={panelId}
        {...buttonProps}
      >
        {label}
      </Button>
      {state.isOpen && (
        <Panel placement={placement} triggerRef={ref} state={state} id={panelId} {...overlayProps}>
          <Dialog heading={heading ? heading : ''}>{children}</Dialog>
        </Panel>
      )}
    </div>
  );
}
