'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { mergeProps, useHover, useFocusRing } from 'react-aria';

import { TooltipContent } from './components/tooltip-content/tooltip-content.component.js';
import { styles } from './tooltip.styles.js';
import { TooltipProps } from './tooltip.types.js';

// TODO: Complete component/replace with a library that works (react-tooltip if can find a way to remove aria-described by for select)
export function Tooltip({ children, tooltip, id, className }: TooltipProps) {
  const localId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const tooltipWaitTime = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };
  const { hoverProps, isHovered } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({ within: true });

  const startTimer = useCallback(() => {
    tooltipWaitTime.current = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (tooltipWaitTime.current) {
      clearTimeout(tooltipWaitTime.current);
    }
  }, []);

  useEffect(() => {
    setIsOpen(isFocusVisible);
  }, [isFocusVisible]);

  useEffect(() => {
    if (isHovered && !isOpen) startTimer();
    if (!isHovered) setIsOpen(false);

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
