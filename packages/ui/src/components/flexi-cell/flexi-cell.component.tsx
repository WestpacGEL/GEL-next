'use client';

import React, { Ref, forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { ArrowRightIcon } from '../icon/index.js';

import { FlexiCellAdornment, FlexiCellBody } from './components/index.js';
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
  ref: Ref<HTMLElement>,
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
      {...({ ref } as object)}
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
        <FlexiCellBody tag="a" href={href}>
          {children}
        </FlexiCellBody>
      ) : (
        <FlexiCellBody>{children}</FlexiCellBody>
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

export const FlexiCell = forwardRef(FlexiCellBase);
FlexiCell.displayName = 'FlexiCell';
