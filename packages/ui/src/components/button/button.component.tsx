import React, { forwardRef, useMemo } from 'react';
import { FocusRing } from 'react-aria';

import { DropDownIcon } from '../icon/index.js';

import { styles as buttonStyles } from './button.styles.js';
import { type ButtonProps } from './button.types.js';
import { getIconSize } from './button.utils.js';

function BaseButton(
  {
    className,
    dropdown = false,
    size = 'medium',
    look = 'hero',
    soft,
    block,
    justify,
    tag: Tag = 'button',
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    children,
    ...props
  }: ButtonProps,
  ref: any,
) {
  const iconSize = useMemo(() => getIconSize(size), [size]);
  const styles = buttonStyles({
    size,
    look,
    soft,
    block,
    justify,
    hasChildren: !!children,
  });
  return (
    <FocusRing focusRingClass="focus-outline">
      <Tag ref={ref} className={styles.base({ className })} {...props}>
        {IconBefore && <IconBefore size={iconSize} className={styles.iconBefore()} />}
        <span className={styles.text()}>{children}</span>
        {IconAfter && <IconAfter size={iconSize} className={styles.iconAfter()} />}
        {dropdown && <DropDownIcon aria-hidden size={iconSize} className={styles.dropdown()} />}
      </Tag>
    </FocusRing>
  );
}

export const Button = forwardRef(BaseButton);
