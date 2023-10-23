'use client';

import React, { Children, FunctionComponentElement, cloneElement } from 'react';
import { useBreadcrumbs } from 'react-aria';

import { type BreadcrumbProps } from './breadcrumb.types.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(children);

  return (
    <nav className={className} {...navProps}>
      <ol className="m-0 flex list-none p-0">
        {Children.map(
          children,
          (child, i) =>
            cloneElement(child as FunctionComponentElement<any>, { isCurrent: i === childCount - 1 }) ?? <></>,
        )}
      </ol>
    </nav>
  );
}
Breadcrumb.Item = BreadcrumbItem;
