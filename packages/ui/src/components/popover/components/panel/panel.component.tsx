import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { ButtonRef } from '../../../button/button.types.js';
import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';

import { usePanel } from './panel.hook.js';
import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

export function BasePanel({
  state,
  heading,
  headingTag: Tag = 'h1',
  content,
  placement = 'top',
  id,
  triggerRef,
  onClose,
  open,
  portal,
}: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<ButtonRef>(null);
  const { popoverPosition, arrowPosition, localPlacement } = usePanel({
    state,
    placement,
    triggerRef,
    portal,
    popoverRef,
  });
  const resolvedPlacement = resolveResponsiveVariant(localPlacement, breakpoint);

  const styles = panelStyles({ placement: resolvedPlacement });
  useEffect(() => {
    if (state.isOpen && !open) {
      if (headingRef.current) {
        headingRef.current.focus();
      } else {
        buttonRef.current?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOpen]);

  return (
    <div style={popoverPosition} className={styles.popover()} test-id="popover" id={id} ref={popoverRef} role="dialog">
      <div className={styles.content()}>
        {heading && (
          <Tag className={styles.heading()} tabIndex={-1} ref={headingRef}>
            {heading}
          </Tag>
        )}
        <div className={styles.body()} id="popover-content">
          {content}
        </div>
        <Button
          look="link"
          tag="button"
          size="small"
          ref={buttonRef}
          onClick={() => {
            onClose?.();
            state.close();
          }}
          className={styles.closeBtn()}
          iconAfter={() => <CloseIcon color="primary" size="small" aria-hidden />}
          aria-label="Close popover"
        />
      </div>
      <div aria-hidden className={styles.arrow()} style={arrowPosition} test-id="arrow" ref={arrowRef} />
    </div>
  );
}

/**
 * @private
 */
export function Panel({ portal = false, ...props }: PanelProps) {
  if (portal) {
    const portalValue = typeof portal === 'boolean' ? document.body : portal;
    return createPortal(<BasePanel {...props} portal={portalValue} />, portalValue);
  }
  return <BasePanel portal={portal} {...props} />;
}
Panel.displayName = 'Popover.Panel';
