import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FocusScope } from 'react-aria';

import { Button } from '../../../button/index.js';
import { CloseIcon } from '../../../icon/index.js';
import { usePopoverPosition } from '../../popover.hooks.js';

import { styles as panelStyles } from './panel.styles.js';
import { type PanelProps } from './panel.types.js';

interface Position {
  arrowPosition?: number;
  empty?: boolean;
  offset?: 'left' | 'right';
  panelPosition?: number | string;
  placement?: 'top' | 'bottom';
}

export function Panel({ state, heading, headingTag: Tag = 'h1', content, placement, id, triggerRef }: PanelProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position>({
    placement,
    empty: !placement,
    offset: 'left',
  });

  useEffect(() => {
    if (state.isOpen) {
      setPosition(usePopoverPosition(triggerRef, popoverRef, arrowRef, placement));
    }
  }, [state.isOpen]);

  const getPopoverClass = useCallback(() => {
    return {
      [position.offset as string]:
        position.offset === 'left' ? `${position.panelPosition}px` : `-${position.panelPosition}px`,
      // transform: position.offset === 'left' ? 'translateX(-50%)' : 'none',
    };
  }, [position]);

  const getArrowClass = useCallback(() => {
    return {
      [!position.offset || position.offset === 'left' ? 'left' : 'right']: `${position.arrowPosition}px`,
    };
  }, [position]);

  const styles = panelStyles({ placement: position.placement, offset: position.offset });

  console.log(position);

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
