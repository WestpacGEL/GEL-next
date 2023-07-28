import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Item } from 'react-stately';

import { Tabs } from './tabs.component.js';

const meta: Meta<typeof Tabs> = {
  title: 'Example/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    'aria-label': 'History of Ancient Rome',
    children: [
      <Tabs.Panel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
      </Tabs.Panel>,
      <Tabs.Panel key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
      </Tabs.Panel>,
      <Tabs.Panel key="Emp" title="Empire">
        Alea jacta est.
      </Tabs.Panel>,
    ],
  },
};
