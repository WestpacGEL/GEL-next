'use client';

import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { styles as buttonStyles } from './button.styles.js';
import { ButtonImplementationProps, ButtonComponent } from './button.types.js';
import { getIconSize } from './button.utils.js';

function BaseButton(
  {
    className,
    size = 'medium',
    look = 'hero',
    soft,
    block = false,
    justify,
    tag: Tag,
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    iconLook,
    iconColor,
    iconSize,
    children,
    removeLinkPadding,
    ...props
  }: ButtonImplementationProps,
  ref: ForwardedRef<unknown>,
) {
  const Component = Tag ?? 'button';
  const renderProps = Component === 'button' ? { ...props, type: props.type ?? 'button' } : props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const btnIconSize = useMemo(() => iconSize || getIconSize(size), [iconSize, size]);
  const breakpoint = useBreakpoint();
  const styles = buttonStyles({
    size: resolveResponsiveVariant(size, breakpoint),
    look: resolveResponsiveVariant(look, breakpoint),
    soft: resolveResponsiveVariant(soft, breakpoint),
    block: resolveResponsiveVariant(block, breakpoint),
    justify: resolveResponsiveVariant(justify, breakpoint),
    isFocusVisible,
    hasChildren: !!children,
    hasIcon: !!IconBefore || !!IconAfter,
    removeLinkPadding,
  });

  // eslint-disable-next-line sonarjs/function-return-type
  const finalIconColor = useMemo(() => {
    if (iconColor !== undefined) {
      return iconColor;
    }

    if (!soft) {
      if (look === 'faint') {
        return 'muted';
      } else if (look === 'link') {
        return 'primary';
      } else {
        return 'mono';
      }
    }

    switch (look) {
      case 'primary':
      case 'hero':
        return look;
      case 'faint':
        return 'muted';
      case 'link':
        return 'primary';
      case 'unstyled':
        return;
    }
  }, [iconColor, look, soft]);

  return (
    <Component ref={ref} className={styles.base({ className })} {...mergeProps(renderProps, focusProps)}>
      {IconBefore && (
        <IconBefore
          look={iconLook}
          size={btnIconSize}
          className={styles.iconBefore()}
          color={finalIconColor}
          aria-hidden
        />
      )}
      <span className={styles.text()}>{children}</span>
      {IconAfter && (
        <IconAfter
          look={iconLook}
          size={btnIconSize}
          className={styles.iconAfter()}
          color={finalIconColor}
          aria-hidden
        />
      )}
    </Component>
  );
}

export const Button = forwardRef(BaseButton) as unknown as ButtonComponent;
