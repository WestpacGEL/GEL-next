import React, { useCallback, useEffect, useRef } from 'react';
import { DismissButton, Overlay, mergeProps, useFocusRing, usePopover } from 'react-aria';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

/**
 * @private
 */
export function Panel({ className, children, state, block, id, ...props }: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { popoverProps } = usePopover({ popoverRef, shouldFlip: false, isNonModal: true, ...props }, state);
  const { isFocused, focusProps } = useFocusRing();
  const styles = panelStyles({ isFocused });
  const width = props.triggerRef.current?.getBoundingClientRect().width;

  // Added this based on accessibility features seen https://gel.westpacgroup.com.au/design-system/components/button-dropdowns?b=WBC&tab=accessibility and React Aria doesn't do this
  const focusHandler = useCallback(
    (event: FocusEvent) => {
      if (
        event.target &&
        popoverRef.current &&
        event.target !== props.triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        state.isOpen
      )
        state.close();
    },
    [state.isOpen],
  );

  // React Aria does not handle click as we need when isNonModal is true so this is needed
  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (
        event.target &&
        props.triggerRef.current &&
        !props.triggerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        state.isOpen
      )
        state.close();
    },
    [state.isOpen],
  );

  useEffect(() => {
    window.document.addEventListener('focusin', focusHandler);
    window.document.addEventListener('click', clickHandler);
    return () => {
      window.document.removeEventListener('focusin', focusHandler);
      window.document.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <Overlay>
      <div
        {...mergeProps(popoverProps, focusProps)}
        id={id}
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
