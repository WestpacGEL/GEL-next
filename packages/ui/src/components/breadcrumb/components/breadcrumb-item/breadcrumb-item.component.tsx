'use client';

import React, { Ref, RefObject, forwardRef, useRef } from 'react';
import { useBreadcrumbItem } from 'react-aria';

import { ArrowRightIcon } from '../../../icon/index.js';

import { styles } from './breadcrumb-item.styles.js';
import { type BreadcrumbItemProps } from './breadcrumb-item.types.js';

export function BaseBreadcrumbItem(
  {
    className,
    isDisabled = false,
    isCurrent = false,
    href,
    children,
    tag: Tag = 'span',
    ...props
  }: BreadcrumbItemProps,
  propRef: Ref<HTMLElement>,
) {
  const ref = useRef(propRef);
  const FinalTag = (Tag === 'a' && isDisabled) || (Tag === 'a' && isCurrent) ? 'span' : Tag;
  const { itemProps } = useBreadcrumbItem(
    {
      ...props,
      children,
      isDisabled,
      isCurrent,
      elementType: FinalTag,
    },
    ref as RefObject<HTMLElement>,
  );
  return (
    <li className="inline-flex items-center [&_:focus-visible]:focus-outline">
      <FinalTag
        {...({ ...itemProps, ref: propRef, href: FinalTag === 'a' ? href : undefined } as object)}
        className={styles({ className, isDisabled, isCurrent })}
      >
        {children}
      </FinalTag>
      {!isCurrent && (
        <span aria-hidden="true" className="flex items-center px-0.5">
          <ArrowRightIcon size="small" className="inline-block" color="primary" />
        </span>
      )}
    </li>
  );
}

export const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(BaseBreadcrumbItem);
