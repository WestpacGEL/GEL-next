import React, { useCallback, useEffect, useRef } from 'react';
import { DismissButton, Overlay, mergeProps, useOverlay, usePopover } from 'react-aria';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

export function Panel({ className, children, state, block, ...props }: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay({ shouldCloseOnBlur: true, onClose: state.close }, popoverRef);
  const { popoverProps } = usePopover({ popoverRef, shouldFlip: false, ...props }, state);
  const styles = panelStyles({});
  const width = props.triggerRef.current?.getBoundingClientRect().width;

  // Added this based on accessibility features seen https://gel.westpacgroup.com.au/design-system/components/button-dropdowns?b=WBC&tab=accessibility and React Aria doesn't do this
  const focusHandler = useCallback(
    (event: globalThis.FocusEvent) => {
      if (event.target && popoverRef.current && !popoverRef.current.contains(event.target as Node) && state.isOpen)
        state.close();
    },
    [state.isOpen],
  );

  useEffect(() => {
    window.document.addEventListener('focusin', focusHandler);
    return () => {
      window.document.removeEventListener('focusin', focusHandler);
    };
  }, [state.isOpen]);

  return (
    <Overlay>
      <div
        {...mergeProps(popoverProps, overlayProps)}
        id="panel-dialog"
        data-testid="panel-dialog"
        style={{ ...popoverProps.style, width: block && width ? `${width}px` : undefined }}
        ref={popoverRef}
        className={styles.base({ className })}
      >
        <DismissButton onDismiss={state.close} />
        <div className={styles.dialog()}>{children}</div>
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
