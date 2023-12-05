import { Item } from '@westpac/ui';

import { styles } from './layout.styles';
import { type LayoutProps, type Variants } from './layout.types';
import { layoutMap } from './layout.utils';

export const Layout = ({ children, layout }: LayoutProps) => {
  return (
    <>
      {children.map((child, index) => {
        const width = layout[index];
        return (
          <Item
            key={index}
            span={layoutMap[width].span}
            start={layoutMap[width].start[index]}
            className={styles({ index: index as Variants['index'] })}
          >
            {child}
          </Item>
        );
      })}
    </>
  );
};
