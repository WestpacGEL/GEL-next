'use client';

import React, { Children, FunctionComponentElement, cloneElement } from 'react';
import { useBreadcrumbs } from 'react-aria';

import { type BreadcrumbProps } from './breadcrumb.types.js';
import { BreadcrumbItemProps } from './components/breadcrumb-item/breadcrumb-item.types.js';

export function Breadcrumb({ className, children, 'aria-label': ariaLabel = 'Breadcrumb', ...props }: BreadcrumbProps) {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(children);

  return (
    <nav className={className} aria-label={ariaLabel} {...navProps}>
      <ol className="m-0 flex list-none p-0">
        {Children.map(
          children,
          (child, i) =>
            cloneElement(child as FunctionComponentElement<BreadcrumbItemProps>, {
              isCurrent: i === childCount - 1,
            }) ?? <></>,
        )}
      </ol>
    </nav>
  );
}
