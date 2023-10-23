import { HTMLAttributes, ReactElement } from 'react';

import { type BreadcrumbItemProps } from './components/breadcrumb-item/index.js';

export type BreadcrumbProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Children with Breadcrumb.Item[]
   */
  children: ReactElement<BreadcrumbItemProps> | ReactElement<BreadcrumbItemProps>[];
};
