import { RefObject, useEffect, useMemo, useState } from 'react';

import { PanelProps } from './panel.types.js';

const PANEL_WIDTH_SIZE = 300;

const getHorizontalPositionPopover = (element: HTMLDivElement, screenWidth: number) => {
  const triggerDOMRect = element.getBoundingClientRect();
  const offsetLeftToCenter = ((PANEL_WIDTH_SIZE - (triggerDOMRect?.width || 0)) / 2) * -1;
  if (triggerDOMRect.left + offsetLeftToCenter <= 0) {
    return 'left';
  }
  if (triggerDOMRect.left + offsetLeftToCenter >= 0 && triggerDOMRect.right + offsetLeftToCenter * -1 <= screenWidth) {
    return 'center';
  }
  if (PANEL_WIDTH_SIZE + (triggerDOMRect?.left || 0) >= screenWidth) {
    return 'right';
  }
};

const getLeftOffsetPerHorizontalPosition = (element: HTMLDivElement, screenWidth: number) => {
  const triggerDOMRect = element.getBoundingClientRect();

  const rightOffset =
    (PANEL_WIDTH_SIZE + (triggerDOMRect?.left || 0) - screenWidth + (screenWidth - (triggerDOMRect?.right || 0))) * -1;
  switch (getHorizontalPositionPopover(element, screenWidth)) {
    case 'center':
      return ((PANEL_WIDTH_SIZE - (triggerDOMRect?.width || 0)) / 2) * -1;
    case 'right':
      // For smaller screens, if adjusting for right makes it go off screen on the left, adjust it to have a 16px space from the edge
      if (triggerDOMRect.left + rightOffset <= 0) {
        return rightOffset - (triggerDOMRect.left + rightOffset) + 16;
      }
      return rightOffset;
    default:
      return 0;
  }
};

export type PanelHookProps = {
  placement: PanelProps['placement'];
  portal: PanelProps['portal'];
  state: PanelProps['state'];
  triggerRef: PanelProps['triggerRef'];
  popoverRef?: RefObject<HTMLDivElement>;
};

/**
 * Custom hook to calculate the position of a popover panel relative to its trigger element.
 * @returns {Object} An object containing the calculated positions for the popover and its arrow.
 * @returns {Object} return.popoverPosition - The calculated position styles for the popover.
 * @returns {Object} return.arrowPosition - The calculated position styles for the popover arrow.
 */
export function usePanel({ state, placement = 'bottom', triggerRef, portal }: PanelHookProps) {
  // using documentElement to get the width of the viewport excluding scrollbar
  const [screenWidth, setScreenWidth] = useState<number>(document.documentElement.clientWidth);
  useEffect(() => {
    const handleResize = () => {
      if (portal instanceof Element) {
        setScreenWidth(portal.clientWidth);
      } else {
        setScreenWidth(document.documentElement.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [portal]);

  const popoverPosition = useMemo(() => {
    const triggerDOMRect = triggerRef.current?.getBoundingClientRect();
    // The offset is calculated according if the popover will overflow the window
    const leftOffset = triggerRef.current ? getLeftOffsetPerHorizontalPosition(triggerRef.current, screenWidth) : 0;
    // If it is not portal, we can simplify the logic
    if (!portal) {
      switch (placement) {
        case 'top':
          return {
            bottom: '100%',
            left: leftOffset,
          };
        case 'bottom':
        default:
          return {
            top: '100%',
            left: leftOffset,
          };
      }
    }

    // If it is portal, we need to considerate the scroll if there is a scroll in the portal
    const portalElement = portal as Element;
    switch (placement) {
      case 'top':
        return {
          // The top is calculated according to the portal element
          top: `${(triggerDOMRect?.top || 0) - portalElement.getBoundingClientRect().top}px`,
          left: `${(triggerDOMRect?.left || 0) + leftOffset}px`,
          transform: 'translateY(-100%)',
        };
      case 'bottom':
      default:
        return {
          // The top is calculated according to the portal element
          top: `${(triggerDOMRect?.bottom || 0) - portalElement.getBoundingClientRect().top}px`,
          left: `${(triggerDOMRect?.left || 0) + leftOffset}px`,
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, portal, triggerRef, state.isOpen, screenWidth]);

  const arrowPosition = useMemo(() => {
    const triggerDOMRect = triggerRef.current?.getBoundingClientRect();
    const leftOffset = triggerRef.current
      ? getLeftOffsetPerHorizontalPosition(triggerRef.current, screenWidth) * -1
      : 0;

    return {
      left: `${(triggerDOMRect?.width || 0) / 2 + leftOffset}px`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef, state.isOpen, screenWidth]);

  return {
    popoverPosition,
    arrowPosition,
  };
}
