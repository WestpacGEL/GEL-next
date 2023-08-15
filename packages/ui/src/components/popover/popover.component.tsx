import React, { useRef } from 'react';
import { useOverlayTrigger } from 'react-aria';
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
  const { overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, ref);
  const styles = popoverStyles({});
  return (
    <>
      <Button
        onClick={state.toggle}
        look={iconAfter ? 'link' : look}
        iconAfter={iconAfter}
        ref={ref}
        className={styles.button()}
      >
        {label}
      </Button>
      {state.isOpen && (
        <Panel placement={placement} triggerRef={ref} state={state} {...overlayProps}>
          <Dialog heading={heading ? heading : ''} {...overlayProps}>
            {children}
          </Dialog>
        </Panel>
      )}
    </>
  );
}
