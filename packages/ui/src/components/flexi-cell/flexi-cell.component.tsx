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
    badge,
    before,
    body,
    after,
    withArrow,
    withBorder = false,
    href,
    withHoverEffect = false,
    ...props
  }: FlexiCellProps,
  ref: any,
) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = flexiCellStyles({ className, withBorder, isLink: !!href || withHoverEffect, isFocusVisible });
  return (
    <Tag {...({ ref } as any)} className={styles.base({ className })} href={href} {...mergeProps(props, focusProps)}>
      {badge && <div className={styles.badge()}>{badge}</div>}
      {before}
      <div className={styles.bodyWrapper()}>{body ? <FlexiCellBody>{children}</FlexiCellBody> : children}</div>
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
