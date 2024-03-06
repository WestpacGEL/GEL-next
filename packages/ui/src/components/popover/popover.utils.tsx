import { RefObject } from 'react';

import { Position } from './components/panel/panel.types.js';

export const getPopoverPosition = (
  triggerRef: RefObject<HTMLDivElement>,
  popoverRef: RefObject<HTMLDivElement>,
  arrowRef: RefObject<HTMLDivElement>,
  placement?: 'top' | 'bottom',
): Position => {
  // bail early without refs
  if (!triggerRef.current || !popoverRef.current || !arrowRef.current) {
    throw new Error('You must pass valid refs.');
  }

  const trigger = triggerRef.current.getBoundingClientRect();
  const popover = popoverRef.current.getBoundingClientRect();
  const arrow = arrowRef.current.getBoundingClientRect();
  const remSize =
    typeof window !== 'undefined'
      ? parseInt(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize)
      : 1;

  const position: Position = {
    placement: placement ? placement : 'top',
    offset: popover.right >= window.innerWidth ? 'right' : 'left',
    panelPosition: trigger.width / 2 / remSize,
    arrowPosition: (popover.width / 2 - arrow.width / 2) / remSize,
  };
  if (typeof window === 'undefined') {
    return position;
  }

  const offLeft = popover.left <= 0;
  const offRight = popover.right + remSize >= window.innerWidth;

  if (offLeft) {
    position.panelPosition = (popover.width - popover.right + trigger.width / 2 + remSize) / remSize;
    position.arrowPosition = (trigger.right - trigger.width / 2 - arrow.width / 2 - remSize) / remSize;
  }

  if (offRight) {
    position.panelPosition = (window.innerWidth - trigger.right - remSize) / remSize;
    position.arrowPosition =
      (window.innerWidth - (trigger.left + trigger.width / 2) - (remSize + arrow.width / 2)) / remSize;
  }

  if (popover.height > trigger.top) {
    position.placement = placement ? placement : 'bottom';
    return position;
  }

  if (popover.bottom > window.innerHeight) {
    position.placement = placement ? placement : 'top';
    return position;
  }

  return position;
};
