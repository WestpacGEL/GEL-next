import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Tabs } from './tabs.component.js';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => {
      /**
       * NOTE:
       * Needed to change displayName here so subcomponent shows correct name in code view
       * Could not change it on the component as Item from react-stately is used in three components
       * and one displayName would overwrite the others
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Tabs.Panel.displayName = 'Tabs.Panel';

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

/**
 * > Default usage example
 */
export const Justify: Story = {
  args: {
    justify: true,
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

/**
 * > Default usage example
 */
export const Color: Story = {
  args: {
    justify: true,
    color: 'hero',
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

/**
 * > Vertical story usage example
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
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
