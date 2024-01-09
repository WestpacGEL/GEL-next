import { Grid, GridItem } from '@westpac/ui';

import { type LayoutProps } from './layout.types';

export const Layout = ({ children, layout }: LayoutProps) => {
  return (
    <Grid className="mb-7 mt-6 xsl:mb-10 xsl:mt-9">
      {children.map((child, index) => (
        <GridItem span={{ initial: 12, sm: layout[index] as any }} key={index}>
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};
