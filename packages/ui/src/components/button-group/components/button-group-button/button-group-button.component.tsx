'use client';

import React, { useContext, useRef } from 'react';
import { useFocusRing, useToggleButtonGroupItem } from 'react-aria';

import { useBreakpoint } from '../../../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../../../utils/breakpoint.util.js';
import { Button } from '../../../button/button.component.js';
import { ButtonRef } from '../../../button/button.types.js';
import { ToggleButtonGroupContext } from '../../button-group.component.js';

import { styles as buttonGroupButtonStyles } from './button-group-button.styles.js';

import type { ButtonGroupButtonProps } from './button-group-button.types.js';

export function ButtonGroupButton({ className, ...props }: ButtonGroupButtonProps) {
  const ref = useRef<ButtonRef | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { size, look, block, orientation, ...state } = useContext(ToggleButtonGroupContext)!;
  const { buttonProps, isPressed, isSelected } = useToggleButtonGroupItem(props, state, ref);
  const breakpoint = useBreakpoint();
  const { isFocusVisible, focusProps } = useFocusRing();
  const resolvedSize = resolveResponsiveVariant(size, breakpoint);
  const resolvedBlock = resolveResponsiveVariant(block, breakpoint);

  const styles = buttonGroupButtonStyles({
    block: resolvedBlock,
    isFocusVisible,
    size: resolvedSize,
    orientation,
  });

  return (
    <Button
      {...buttonProps}
      {...focusProps}
      className={styles.button({ className })}
      soft={!isSelected}
      data-pressed={isPressed}
      data-selected={isSelected}
      ref={ref}
      look={look}
      size={resolvedSize}
    >
      {props.children}
    </Button>
  );
}
