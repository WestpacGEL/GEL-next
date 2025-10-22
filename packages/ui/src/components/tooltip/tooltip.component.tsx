import { useEffect, useId, useState } from 'react';
import { mergeProps, useHover, useFocusRing } from 'react-aria';

import { TooltipContent } from './components/tooltip-content/tooltip-content.component.js';
import { styles } from './tooltip.styles.js';
import { TooltipProps } from './tooltip.types.js';

// TODO: Complete component/replace with a library that works (react-tooltip if can find a way to remove aria-described by for select)
export function Tooltip({ children, tooltip, id, className }: TooltipProps) {
  const localId = useId();
  const [isOpen, setIsOpen] = useState(false);
  let tooltipWaitTime: NodeJS.Timeout;

  const startTimer = () => {
    tooltipWaitTime = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  const stopTimer = () => {
    if (tooltipWaitTime) {
      clearTimeout(tooltipWaitTime);
      setIsOpen(false);
    }
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if ('key' in e && e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };
  const { hoverProps, isHovered } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({ within: true });

  useEffect(() => {
    setIsOpen(isFocusVisible);
  }, [isFocusVisible]);

  useEffect(() => {
    if (isHovered && !isOpen) startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <span {...mergeProps(hoverProps, focusProps)} className={styles({ className })}>
      {children}
      {isOpen && <TooltipContent id={id ?? localId}>{tooltip}</TooltipContent>}
    </span>
  );
}
