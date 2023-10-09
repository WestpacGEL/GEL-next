import { type Meta, StoryFn } from '@storybook/react';

import { Container, Item } from './components/index.js';
import { Grid } from './grid.component.js';

const meta: Meta<typeof Grid> = {
  title: 'Foundation/Grid',
  component: Grid,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="mt-10">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const GridStory = () => {
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

export const ContainerStory = () => {
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

export const ItemStory = () => {
  return (
    <Container>
      <Grid>
        <Item span={{ initial: 6, lg: 2 }} className="border border-border bg-light p-2 text-center">
          span - (xs:6, lg:3)
        </Item>
        <Item span={{ initial: 6, lg: 10 }} className="border border-border bg-light p-2 text-center">
          span - (xs:6, lg:10)
        </Item>
        <Item start={5} span={4} className="border border-border bg-light p-2 text-center">
          start:5 span:4
        </Item>
      </Grid>
    </Container>
  );
};
