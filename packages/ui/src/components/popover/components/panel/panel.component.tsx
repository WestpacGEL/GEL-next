import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FocusScope } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';
import { usePopoverPosition } from '../../popover.hooks.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps, Position } from './panel.types.js';

/**
 * @private
 */
export function Panel({ state, heading, headingTag: Tag = 'h1', content, placement, id, triggerRef }: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const remSize = useMemo(() => {
    if (typeof window !== 'undefined') {
      return (
        parseInt(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize)
      );
    }
    return 1;
  }, []);

  const [position, setPosition] = useState<Position>({
    placement: 'top',
    offset: 'left',
    panelPosition: triggerRef.current ? triggerRef.current.offsetWidth / 2 / remSize : 0,
    arrowPosition: popoverRef.current ? popoverRef.current.getBoundingClientRect().width / 2 / remSize : 0,
  });

  useLayoutEffect(() => {
    setPosition(usePopoverPosition(triggerRef, popoverRef, arrowRef, placement));
  }, [state.isOpen]);

  const getPopoverClass = useCallback(() => {
    return {
      [position.offset as string]:
        position.offset === 'left' ? `${position.panelPosition}rem` : `-${position.panelPosition}rem`,
      transform: position.offset === 'left' ? 'translateX(-50%)' : 'none',
    };
  }, [position]);

  const getArrowClass = useCallback(() => {
    return {
      [!position.offset || position.offset === 'left' ? 'left' : 'right']: `${position.arrowPosition}rem`,
    };
  }, [position]);

  const styles = panelStyles({ placement: position.placement });

  return (
    <FocusScope restoreFocus>
      <div className={styles.popover()} style={getPopoverClass()} id={id} ref={popoverRef}>
        <div className={styles.content()}>
          <Tag className={styles.heading()}>{heading}</Tag>
          <div className={styles.body()}>{content}</div>
          <Button
            look="link"
            onClick={state.close}
            className={styles.closeBtn()}
            iconAfter={() => <CloseIcon color="muted" size="small" aria-hidden />}
            aria-label="Close popover"
          />
        </div>
        <div aria-hidden className={styles.arrow()} style={getArrowClass()} ref={arrowRef} />
      </div>
    </FocusScope>
  );
}
Panel.displayName = 'Popover.Panel';
