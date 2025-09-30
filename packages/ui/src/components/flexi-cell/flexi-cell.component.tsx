'use client';

import React, { Ref, forwardRef, useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
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
    body = true,
    ...props
  }: FlexiCellProps,
  ref: Ref<HTMLElement>,
) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const breakpoint = useBreakpoint();

  const styles = flexiCellStyles({
    className,
    isLink: !!href,
    isFocusVisible,
    shouldHoverEffect: !withBorder && !dualAction,
    withBorder: resolveResponsiveVariant(withBorder, breakpoint),
    size: resolveResponsiveVariant(size, breakpoint),
  });

  const content = useMemo(() => {
    if (dualAction && href) {
      return (
        <FlexiCellBody tag="a" href={href}>
          {children}
        </FlexiCellBody>
      );
    }
    return body ? <FlexiCellBody>{children}</FlexiCellBody> : <div className="flex-1">{children}</div>;
  }, [body, children, dualAction, href]);

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
      {content}
      {after}
      {withArrow && (
        <FlexiCellAdornment align="top">
          <ArrowRightIcon color="primary" aria-hidden="true" />
        </FlexiCellAdornment>
      )}
    </Tag>
  );
}

export const FlexiCell = forwardRef(FlexiCellBase);
FlexiCell.displayName = 'FlexiCell';
