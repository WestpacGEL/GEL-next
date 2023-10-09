import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Switch } from './switch.component.js';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex p-3">
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

const SIZES = ['small', 'medium', 'large', 'xlarge'];

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    size: 'medium',
    label: 'eStatements',
  },
};

/**
 * > Selected switch example
 */
export const SelectedSwitch: Story = {
  args: {
    label: 'eStatements',
    checked: true,
  },
};

/**
 * > Switch size example
 */
export const SwitchSizes = () => (
  <div>
    {SIZES.map((size: any) => (
      <div key={size}>
        <h3 className="font-bold">{size}</h3>
        <div className="mb-2">
          <Switch size={size} label="eStatements" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * > Disabled switch example
 */
export const DisabledSwitch: Story = {
  args: {
    label: 'eStatements',
    isDisabled: true,
  },
};

/**
 * > Block switch example
 */
export const BlockSwitch = () => (
  <div>
    <>
      <div className="mb-2">
        <Switch
          block
          label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur corporis sint, facere sequi provident eius similique ab velit, beatae aut architecto porro quidem neque necessitatibus, quis nulla itaque labore harum, in nesciunt! Molestiae, voluptatum, voluptas. Quo pariatur, voluptate ducimus nemo?"
        />
      </div>
      <div className="mb-2">
        <Switch block label="eStatements" />
      </div>
    </>
  </div>
);

/**
 * > Responsive switch example
 */
export const ResponsiveSizeSwitch: Story = {
  args: {
    label: 'eStatements',
    size: { initial: 'small', md: 'large', lg: 'xlarge' },
  },
};
