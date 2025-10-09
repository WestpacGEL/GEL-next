import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Tabs, TabsPanel } from './tabs.component.js';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => {
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    look: 'default',
    color: undefined,
    orientation: 'horizontal',
    'aria-label': 'History of Ancient Rome',
    children: [
      <TabsPanel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabsPanel>,
      <TabsPanel key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
      </TabsPanel>,
      <TabsPanel key="Emp" title="Empire">
        Alea jacta est.
      </TabsPanel>,
    ],
  },
};

/**
 * > Default usage example
 */
export const Justify: Story = {
  args: {
    justify: true,
    children: [
      <TabsPanel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabsPanel>,
      <TabsPanel key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
      </TabsPanel>,
      <TabsPanel key="Emp" title="Empire">
        Alea jacta est.
      </TabsPanel>,
    ],
  },
};

/**
 * > KeepTabPanelMounted usage example
 */
export const KeepTabPanelMounted: Story = {
  args: {
    justify: true,
    children: [
      <TabsPanel key="FoR" title="Founding of Rome" keepMounted={true}>
        Arma virumque cano, Troiae qui primus ab oris.
      </TabsPanel>,
      <TabsPanel key="MaR" title="Monarchy and Republic" keepMounted={true}>
        Senatus Populusque Romanus.
      </TabsPanel>,
      <TabsPanel key="Emp" title="Empire">
        Alea jacta est.
      </TabsPanel>,
    ],
  },
};

/**
 * > Default usage example
 */
export const Color: Story = {
  args: {
    justify: true,
    color: 'hero',
    children: [
      <TabsPanel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabsPanel>,
      <TabsPanel key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
      </TabsPanel>,
      <TabsPanel key="Emp" title="Empire">
        Alea jacta est.
      </TabsPanel>,
    ],
  },
};

/**
 * > Vertical story usage example
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    children: [
      <TabsPanel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris.
      </TabsPanel>,
      <TabsPanel key="MaR" title="Monarchy and Republic">
        Senatus Populusque Romanus.
      </TabsPanel>,
      <TabsPanel key="Emp" title="Empire">
        Alea jacta est.
      </TabsPanel>,
    ],
  },
};
