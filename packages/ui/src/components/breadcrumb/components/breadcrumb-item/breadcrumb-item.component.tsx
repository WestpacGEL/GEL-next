'use client';

import { filterDOMProps } from '@react-aria/utils';
import { type FocusableElement } from '@react-types/shared';
import React, { ForwardedRef, forwardRef } from 'react';
import { mergeProps, useBreadcrumbItem, useObjectRef } from 'react-aria';

import { ArrowRightIcon } from '../../../icon/index.js';

import { styles } from './breadcrumb-item.styles.js';
import { BreadcrumbItemComponent, BreadcrumbItemImplementationProps } from './breadcrumb-item.types.js';

export function BaseBreadcrumbItem(
  {
    className,
    isDisabled = false,
    isCurrent = false,
    href,
    children,
    tag: Tag = 'span',
    elementType,
    'aria-current': ariaCurrent,
    autoFocus,
    onBlur,
    onClick,
    onFocus,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    routerOptions,
    ...componentProps
  }: BreadcrumbItemImplementationProps,
  ref: ForwardedRef<unknown>,
) {
  const isLinkTag = Tag === 'a' || typeof Tag !== 'string';
  // Current and disabled links are rendered as plain text
  const Component = isLinkTag && (isDisabled || isCurrent) ? 'span' : Tag;
  const rendersLink = Component === Tag && isLinkTag;
  const ariaElementType = typeof Component === 'string' ? Component : (elementType ?? 'a');
  const itemRef = useObjectRef(ref as ForwardedRef<FocusableElement>);
  const { itemProps } = useBreadcrumbItem(
    {
      'aria-current': ariaCurrent,
      autoFocus,
      children,
      elementType: ariaElementType,
      href: rendersLink && typeof href === 'string' ? href : undefined,
      isCurrent,
      isDisabled,
      onBlur,
      onClick,
      onFocus,
      onFocusChange,
      onKeyDown,
      onKeyUp,
      onPress,
      onPressChange,
      onPressEnd,
      onPressStart,
      onPressUp,
      routerOptions,
    },
    itemRef,
  );
  const renderProps =
    Component === Tag
      ? { ...componentProps, href: rendersLink ? href : undefined }
      : filterDOMProps(componentProps, { labelable: true });
  // Custom components (e.g. NextLink) resolve their own href, so keep it untransformed by RouterProvider's useHref
  const customComponentProps = typeof Component === 'string' ? {} : { href };

  return (
    <li className="inline-flex items-center **:focus-visible:focus-outline">
      <Component
        {...mergeProps(renderProps, itemProps, customComponentProps)}
        ref={itemRef}
        className={styles({ className, isDisabled, isCurrent })}
      >
        {children}
      </Component>
      {!isCurrent && (
        <span aria-hidden="true" className="flex items-center px-0.5">
          <ArrowRightIcon size="small" className="inline-block" color="primary" />
        </span>
      )}
    </li>
  );
}

export const BreadcrumbItem = forwardRef(BaseBreadcrumbItem) as unknown as BreadcrumbItemComponent;
