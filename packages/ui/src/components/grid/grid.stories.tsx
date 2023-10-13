import { type Meta, StoryFn } from '@storybook/react';

import { Container, Item } from './components/index.js';
import { Grid } from './grid.component.js';

const meta: Meta<typeof Grid> = {
  title: 'Foundation/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

export const Default = () => {
  const items = Array(12).fill(null);

  return (
    <Grid>
      {items.map((_, i) => (
        <Item key={i} className="border border-border bg-light p-2 text-center">
          {i + 1}
        </Item>
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
          <Item key={i} className="border border-border bg-light p-2 text-center">
            {i + 1}
          </Item>
        ))}
      </Grid>
    </Container>
  );
};

export const ResponsiveItems = () => {
  return (
    <Container>
      <Grid>
        <Item span={{ initial: 6, lg: 2 }} className="border border-border bg-light p-2 text-center">
          span - (xs:6, lg:3)
        </Item>
        <Item span={{ initial: 6, lg: 10 }} className="border border-border bg-light p-2 text-center">
          span - (xs:6, lg:10)
        </Item>
      </Grid>
    </Container>
  );
};

export const Positioning = () => {
  return (
    <Container>
      <Grid>
        <Item span={4} className="border border-border bg-light p-2 text-center">
          Top Left
        </Item>
        <Item start={9} span={4} className="border border-border bg-light p-2 text-center">
          Top Right
        </Item>
        <Item start={5} span={4} className="border border-border bg-light p-2 text-center">
          Middle
        </Item>
        <Item start={1} span={4} className="border border-border bg-light p-2 text-center">
          Bottom Left
        </Item>
        <Item start={9} span={4} className="border border-border bg-light p-2 text-center">
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
        <Item span={12} className="h-12 border border-border bg-light p-2 text-center">
          Header
        </Item>
        <Item span={3} className="h-10 border border-border bg-light p-2 text-center">
          Menu
        </Item>
        <Item span={6} className="h-10 border border-border bg-light p-2 text-center">
          Content
        </Item>
        <Item span={3} className="h-10 border border-border bg-light p-2 text-center">
          Ads
        </Item>
        <Item span={12} className="h-12 border border-border bg-light p-2 text-center">
          Footer
        </Item>
      </Grid>
    </Container>
  );
};
