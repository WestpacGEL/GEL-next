'use client';

import React, { forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { ArrowRightIcon } from '../icon/index.js';

import {
  FlexiCellAdornment,
  FlexiCellBody,
  FlexiCellButton,
  FlexiCellCircle,
  FlexiCellFooter,
  FlexiCellHint,
  FlexiCellLabel,
} from './components/index.js';
import { styles as flexiCellStyles } from './flexi-cell.styles.js';
import { type FlexiCellProps } from './flexi-cell.types.js';

function FlexiCellBase(
  {
    className,
    tag: Tag = 'div',
    children,
    before,
    after,
    withArrow,
    withBorder = false,
    href,
    dualAction = false,
    topBadge: TopBadge,
    size = 'default',
    disabled,
    tabIndex,
    ...props
  }: FlexiCellProps,
  ref: any,
) {
  const { isFocusVisible, focusProps } = useFocusRing();

  const styles = flexiCellStyles({
    className,
    withBorder,
    isLink: !!href,
    isFocusVisible,
    shouldHoverEffect: !withBorder && !dualAction,
    size,
  });

  return (
    <Tag
      {...({ ref } as any)}
      className={styles.base({ className })}
      href={href}
      {...mergeProps(props, focusProps)}
      tabIndex={disabled ? -1 : tabIndex}
    >
      {TopBadge && (
        <div className={styles.topBadgeWrapper()}>
          <TopBadge className={styles.topBadge()} color="hero" />
        </div>
      )}
      {before}

      {dualAction && href ? (
        <FlexiCell.Body tag="a" href={href}>
          {children}
        </FlexiCell.Body>
      ) : (
        <FlexiCell.Body>{children}</FlexiCell.Body>
      )}
      {after}
      {withArrow && (
        <FlexiCellAdornment align="top">
          <ArrowRightIcon color="link" aria-hidden="true" />
        </FlexiCellAdornment>
      )}
    </Tag>
  );
}

export const FlexiCell = forwardRef(FlexiCellBase) as React.ForwardRefExoticComponent<
  FlexiCellProps & React.RefAttributes<unknown>
> & {
  Adornment: typeof FlexiCellAdornment;
  Body: typeof FlexiCellBody;
  Button: typeof FlexiCellButton;
  Circle: typeof FlexiCellCircle;
  Footer: typeof FlexiCellFooter;
  Hint: typeof FlexiCellHint;
  Label: typeof FlexiCellLabel;
};

FlexiCell.Body = FlexiCellBody;
FlexiCell.Footer = FlexiCellFooter;
FlexiCell.Adornment = FlexiCellAdornment;
FlexiCell.Hint = FlexiCellHint;
FlexiCell.Label = FlexiCellLabel;
FlexiCell.Button = FlexiCellButton;
FlexiCell.Circle = FlexiCellCircle;

FlexiCell.displayName = 'FlexiCell';
