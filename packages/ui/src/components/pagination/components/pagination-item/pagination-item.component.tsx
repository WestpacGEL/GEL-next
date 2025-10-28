import React from 'react';

import { styles } from './pagination-item.styles.js';
import { type PaginationItemProps } from './pagination-item.types.js';
import { AriaButtonOptions, mergeProps, useButton, useFocusRing } from 'react-aria';

/**
 * @private
 */
export function PaginationItem({
  className,
  firstItem = false,
  lastItem = false,
  tag: Tag = 'a',
  children,
  active,
  disabled = false,
  ...props
}: PaginationItemProps) {
  let ref = React.useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  let { buttonProps } = useButton(props as AriaButtonOptions<'button'>, ref);

  const finalButtonProps = mergeProps(focusProps, buttonProps);

  return (
    <Tag
      className={styles({ className, firstItem, lastItem, active, disabled, isFocusVisible })}
      {...finalButtonProps}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-current={active ? 'page' : undefined}
      {...(Tag === 'button' && { type: 'button' })}
    >
      {children}
    </Tag>
  );
}
