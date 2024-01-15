import { GridItem } from '@westpac/ui';
import { clsx } from 'clsx';
import { Children } from 'react';

import { type LayoutProps } from './layout.types';
import { layoutMap } from './layout.utils';

export const Layout = ({ children, layout }: LayoutProps) => {
  return (
    <>
      {Children.map(children, (child, index) => {
        const width = layout[index];
        return (
          <GridItem
            key={index}
            span={layoutMap[width].span}
            start={layoutMap[width].start[index]}
            className={clsx(index === 0 && 'group')}
          >
            {child}
          </GridItem>
        );
      })}
    </>
  );
};
