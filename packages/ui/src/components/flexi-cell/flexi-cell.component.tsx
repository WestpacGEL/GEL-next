import React from 'react';

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

export function FlexiCell({
  className,
  tag: Tag = 'div',
  children,
  badge,
  badgeZIndex,
  before,
  body,
  after,
  withArrow,
  withBorder = false,
  href,
  ...props
}: FlexiCellProps) {
  const styles = flexiCellStyles({ withBorder, isLink: !!href });
  return (
    <Tag className={styles.base({ className })} href={href} {...props}>
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
FlexiCell.Body = FlexiCellBody;
FlexiCell.Footer = FlexiCellFooter;
FlexiCell.Adornment = FlexiCellAdornment;
FlexiCell.Hint = FlexiCellHint;
FlexiCell.Label = FlexiCellLabel;
FlexiCell.Button = FlexiCellButton;
FlexiCell.Circle = FlexiCellCircle;
