import { Grid, Item } from '@westpac/ui';

import { type LayoutProps } from './layout.types';

export const Layout = ({ children, layout }: LayoutProps) => {
  return (
    <Grid>
      {children.map((child, index) => (
        <Item span={{ initial: 12, sm: layout[index] as any }} key={index}>
          {child}
        </Item>
      ))}
    </Grid>
  );
};
