import React, { Children, FunctionComponentElement, cloneElement } from 'react';
import { useBreadcrumbs } from 'react-aria';

import { styles } from './breadcrumb.styles.js';
import { type BreadcrumbProps } from './breadcrumb.types.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(children);

  return (
    <nav className={styles({ className })} {...navProps}>
      <ol style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
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
