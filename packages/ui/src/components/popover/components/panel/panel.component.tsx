import React, { useRef } from 'react';
import { FocusScope } from 'react-aria';
import { createPortal } from 'react-dom';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
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
  placement = 'bottom',
  id,
  triggerRef,
  portal,
}: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const resolvedPlacement = resolveResponsiveVariant(placement, breakpoint);
  const { popoverPosition, arrowPosition } = usePanel({ state, placement: resolvedPlacement, triggerRef, portal });

  const styles = panelStyles({ placement: resolvedPlacement });
  return (
    <FocusScope autoFocus restoreFocus>
      <div style={popoverPosition} className={styles.popover()} test-id="popover" id={id} ref={popoverRef}>
        <div className={styles.content()}>
          {heading && (
            <Tag tabIndex={0} className={styles.heading()}>
              {heading}
            </Tag>
          )}
          <div className={styles.body()} tabIndex={0}>
            {content}
          </div>
          <Button
            look="link"
            size="small"
            onClick={() => state.close()}
            className={styles.closeBtn()}
            iconAfter={() => <CloseIcon color="primary" size="small" aria-hidden />}
            aria-label="Close popover"
          />
        </div>
        <div aria-hidden className={styles.arrow()} style={arrowPosition} test-id="arrow" ref={arrowRef} />
      </div>
    </FocusScope>
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
