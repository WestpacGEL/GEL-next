import React, { useCallback, useEffect, useRef } from 'react';
import { DismissButton, FocusScope, mergeProps, useFocusRing, usePopover } from 'react-aria';
import { createPortal } from 'react-dom';

import { styles as panelStyles } from './button-dropdown-panel.styles.js';
import { type ButtonDropdownPanelProps } from './button-dropdown-panel.types.js';

/**
 * @private
 */
export function BaseButtonDropdownPanel({ className, children, state, block, id, ...props }: ButtonDropdownPanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { popoverProps } = usePopover({ popoverRef, shouldFlip: false, isNonModal: false, ...props }, state);
  const { isFocused, focusProps } = useFocusRing();
  const styles = panelStyles({ isFocused });
  const width = props.triggerRef.current?.getBoundingClientRect().width;

  // Added this based on accessibility features seen https://gel.westpacgroup.com.au/design-system/components/button-dropdowns?b=WBC&tab=accessibility and React Aria doesn't do this
  const focusHandler = useCallback(
    (event: FocusEvent) => {
      if (
        event.target &&
        popoverRef.current &&
        // eslint-disable-next-line sonarjs/different-types-comparison
        event.target !== props.triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        state.isOpen
      )
        state.close();
    },
    [props.triggerRef, state],
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
    [props.triggerRef, state],
  );

  useEffect(() => {
    window.document.addEventListener('focusin', focusHandler);
    window.document.addEventListener('click', clickHandler);
    return () => {
      window.document.removeEventListener('focusin', focusHandler);
      window.document.removeEventListener('click', clickHandler);
    };
  }, [clickHandler, focusHandler]);

  return (
    <FocusScope autoFocus restoreFocus>
      <div
        {...mergeProps(popoverProps, focusProps)}
        id={id}
        style={{ ...popoverProps.style, width: block && width ? `${width}px` : undefined }}
        ref={popoverRef}
        className={styles.base({ className })}
      >
        <DismissButton onDismiss={() => state.close()} />
        <div className={styles.dialog()}>{children}</div>
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );
}

/**
 * @private
 */
export function ButtonDropdownPanel({ portal, ...props }: ButtonDropdownPanelProps) {
  if (portal) {
    const portalValue = typeof portal === 'boolean' ? document.body : portal;
    return createPortal(<BaseButtonDropdownPanel {...props} portal={portalValue} />, portalValue);
  }
  return <BaseButtonDropdownPanel portal={portal} {...props} />;
}
