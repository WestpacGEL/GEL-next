import { Grid, GridItem } from '@westpac/ui';

import { type LayoutProps } from './layout.types';

type GridSize = 1 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
export const Layout = ({ children, layout }: LayoutProps) => {
  return (
    <Grid className="mb-7 mt-6 xsl:mb-10 xsl:mt-9">
      {children.map((child, index) => (
        <GridItem span={{ initial: 12, sm: layout[index] as GridSize }} key={index}>
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};
