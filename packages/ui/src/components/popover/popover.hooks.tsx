import { RefObject } from 'react';

interface Position {
  arrowPosition?: number;
  empty?: boolean;
  offset: 'left' | 'right';
  panelPosition?: number | string;
  placement?: 'top' | 'bottom';
}

export const usePopoverPosition = (
  triggerRef: RefObject<HTMLDivElement>,
  popoverRef: RefObject<HTMLDivElement>,
  arrowRef: RefObject<HTMLDivElement>,
  placement?: 'top' | 'bottom',
): Position => {
  //TODO: Update arrow location on left offset
  //TODO: Update space between left side of screen and popover when open and offset

  // bail early without refs
  if (!triggerRef.current || !popoverRef.current || !arrowRef.current) {
    throw new Error('You must pass two valid refs.');
  }

  let position: Position = { placement: undefined, offset: 'left', panelPosition: 0, arrowPosition: 0 };

  if (typeof window === 'undefined') {
    return position;
  }
  const remSize = parseInt(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize);

  const trigger = triggerRef.current.getBoundingClientRect();
  const popover = popoverRef.current.getBoundingClientRect();
  const arrow = arrowRef.current.getBoundingClientRect();

  console.log(popover);
  // console.log(window.innerWidth - (trigger.left + trigger.width / 2) - (remSize + arrow.width / 2));

  const offLeft = popover.left <= 0;
  const offRight = popover.right >= window.innerWidth;

  let offset: 'left' | 'right' = 'left';
  if (popover.right > window.innerWidth) offset = 'right';

  console.log(offLeft);
  console.log(offRight);

  let panelPosition = trigger.width / 2;
  let arrowPosition = (popover.width - arrow.width) / 2;

  if (offLeft) {
    panelPosition = popover.width / 2 + remSize;
    arrowPosition = popover.width / 2 + remSize;
  } else if (offRight) {
    panelPosition = window.innerWidth - trigger.right - remSize;
    arrowPosition = window.innerWidth - (trigger.left + trigger.width / 2) - (remSize + arrow.width / 2);
  }
  // const left = offLeft ? popover.width / 2 + remSize : trigger.width / 2;
  // const right = offRight ? window.innerWidth - trigger.right - remSize : 0;
  // const center = window.innerWidth - (trigger.right - trigger.width / 2) - 24;

  if (popover.top > trigger.top) {
    position = {
      placement: placement ? placement : 'bottom',
      offset,
      panelPosition,
      arrowPosition,
    };
  } else {
    position = {
      placement: placement ? placement : 'top',
      offset,
      panelPosition,
      arrowPosition,
    };
  }

  return position;
};
