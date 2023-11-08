import { type Meta, StoryFn } from '@storybook/react';

import { Container, Item as GridItem } from './components/index.js';
import { type ItemProps } from './components/item/item.types.js';
import { Grid } from './grid.component.js';

const meta: Meta<typeof Grid> = {
  title: 'Foundation/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const Item = (props: ItemProps) => (
  <GridItem className="flex h-10 items-center justify-center border border-border bg-light" {...props} />
);

export const Default = () => {
  const items = Array(12).fill(null);

  return (
    <Grid>
      {items.map((_, i) => (
        <Item key={i}>{i + 1}</Item>
      ))}
    </Grid>
  );
};

export const DefaultContainer = () => {
  const items = Array(12).fill(null);

  return (
    <Container>
      <Grid>
        {items.map((_, i) => (
          <Item key={i}>{i + 1}</Item>
        ))}
      </Grid>
    </Container>
  );
};

export const ResponsiveItems = () => {
  return (
    <Container>
      <Grid>
        <Item span={{ initial: 6, lg: 2 }}>span - (xs:6, lg:3)</Item>
        <Item span={{ initial: 6, lg: 10 }}>span - (xs:6, lg:10)</Item>
      </Grid>
    </Container>
  );
};

export const Positioning = () => {
  return (
    <Container>
      <Grid>
        <Item span={4}>Top Left</Item>
        <Item start={9} span={4}>
          Top Right
        </Item>
        <Item start={5} span={4}>
          Middle
        </Item>
        <Item start={1} span={4}>
          Bottom Left
        </Item>
        <Item start={9} span={4}>
          Bottom Right
        </Item>
      </Grid>
    </Container>
  );
};

export const HolyGrailLayout = () => {
  return (
    <Container>
      <Grid>
        <Item span={12}>Header</Item>
        <Item span={3}>Menu</Item>
        <Item span={6}>Content</Item>
        <Item span={3}>Ads</Item>
        <Item span={12}>Footer</Item>
      </Grid>
    </Container>
  );
};
