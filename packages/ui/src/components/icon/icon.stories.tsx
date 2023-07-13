import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { clsx } from 'clsx';
import { useState } from 'react';

import { Icon } from './icon.component.js';

import * as AllIcons from './index.js';

const meta: Meta<typeof Icon> = {
  title: 'Example/Icon',
  component: Icon,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ padding: '3rem' }}>
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

const DifferentSizesScreen = () => {
  const sizes = ['xsmall', 'small', 'large', 'xlarge'];
  const [sizeSelected, setSizeSelected] = useState(sizes[2]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {sizes.map(size => (
          <button
            className={clsx({ 'bg-primary': size === sizeSelected, 'bg-light': size !== sizeSelected }, 'px-3 py-2')}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * > Default usage example
 */
export const DifferentSizesStory: Story = {
  args: {
    children: <DifferentSizesScreen />,
  },
};

/**
 * > Default usage example
 */
export const AllIconsStory: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-2">
        {Object.entries(AllIcons).map(([key, ThisIcon]) => (
          <div key={key}>
            <ThisIcon />
            <span>{`<${key} />`}</span>
          </div>
        ))}
      </div>
    ),
  },
};
