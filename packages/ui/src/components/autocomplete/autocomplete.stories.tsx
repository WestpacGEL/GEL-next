import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Autocomplete, Item } from './autocomplete.component.js';

const meta: Meta<typeof Autocomplete> = {
  title: 'Example/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="h-30 p-3">
        <Story />
      </div>
    ),
  ],
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
    label: 'My label',
    children: [
      <Item key="red panda">Red Panda</Item>,
      <Item key="cat">Cat</Item>,
      <Item key="dog">Dog</Item>,
      <Item key="aardvark">Aardvark</Item>,
      <Item key="kangaroo">Kangaroo</Item>,
      <Item key="snake">Snake</Item>,
    ],
  },
};

/**
 * > Disabled usage example
 */
export const DisabledStory: Story = {
  args: {
    label: 'My label',
    isDisabled: true,
    children: [
      <Item key="red panda">Red Panda</Item>,
      <Item key="cat">Cat</Item>,
      <Item key="dog">Dog</Item>,
      <Item key="aardvark">Aardvark</Item>,
      <Item key="kangaroo">Kangaroo</Item>,
      <Item key="snake">Snake</Item>,
    ],
  },
};

/**
 * > Invalid usage example
 */
export const InvalidStory: Story = {
  args: {
    label: 'My label',
    invalid: true,
    children: [
      <Item key="red panda">Red Panda</Item>,
      <Item key="cat">Cat</Item>,
      <Item key="dog">Dog</Item>,
      <Item key="aardvark">Aardvark</Item>,
      <Item key="kangaroo">Kangaroo</Item>,
      <Item key="snake">Snake</Item>,
    ],
  },
};

/**
 * > Sizes example
 */
export const SizesStory: Story = {
  args: {},
  render: () => {
    return (
      <>
        {['small', 'medium', 'large', 'xlarge'].map(size => (
          <div className="py-2" key={size}>
            <Autocomplete label={size} size={size as any}>
              <Item key="red panda">Red Panda</Item>
              <Item key="cat">Cat</Item>
              <Item key="dog">Dog</Item>
              <Item key="aardvark">Aardvark</Item>
              <Item key="kangaroo">Kangaroo</Item>
              <Item key="snake">Snake</Item>
            </Autocomplete>
          </div>
        ))}
      </>
    );
  },
};

/**
 * > Footer example
 */
export const FooterStory: Story = {
  args: {},
  render: () => {
    return (
      <div className="py-2">
        <Autocomplete label="With footer" footer={<h3>Footer</h3>}>
          <Item key="red panda">Red Panda</Item>
          <Item key="cat">Cat</Item>
          <Item key="dog">Dog</Item>
          <Item key="aardvark">Aardvark</Item>
          <Item key="kangaroo">Kangaroo</Item>
          <Item key="snake">Snake</Item>
        </Autocomplete>
      </div>
    );
  },
};
