import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { Tabs } from './tabs.component.js';

const meta: Meta<typeof Tabs> = {
  title: 'Example/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
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
export const JustifyStory: Story = {
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
export const ColorStory: Story = {
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
export const VerticalStory: Story = {
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

/**
 * > Vertical story usage example
 */
export const MaterialLookStory: Story = {
  args: {
    look: 'material',
    color: 'primary',
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
export const VerticalMaterialLookStory: Story = {
  args: {
    look: 'material',
    color: 'primary',
    orientation: 'vertical',
    children: [
      <Tabs.Panel key="FoR" title="Founding of Rome">
        Arma virumque cano, Troiae qui primus ab oris
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
export const ControlledMaterialLookStory: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key>('FoR');
    return (
      <Tabs
        selectedKey={selectedKey}
        onSelectionChange={key => {
          setSelectedKey(key);
        }}
      >
        <Tabs.Panel key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </Tabs.Panel>
        <Tabs.Panel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </Tabs.Panel>
        <Tabs.Panel key="Emp" title="Empire">
          Alea jacta est.
        </Tabs.Panel>
      </Tabs>
    );
  },
};
