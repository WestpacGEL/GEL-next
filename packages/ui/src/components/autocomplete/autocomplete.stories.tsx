import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { Autocomplete } from './autocomplete.component.js';

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
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    'aria-label': 'Animals',
    children: [
      <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>,
      <Autocomplete.Item key="cat">Cat</Autocomplete.Item>,
      <Autocomplete.Item key="dog">Dog</Autocomplete.Item>,
      <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>,
      <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>,
      <Autocomplete.Item key="snake">Snake</Autocomplete.Item>,
    ],
  },
};

/**
 * > Controlled usage example
 */
export const ControlledStory: Story = {
  args: {},
  render: () => {
    const [selectedKey, setSelectedKey] = useState<Key>();
    const handleSelectionChange = (key: Key) => {
      setSelectedKey(key);
    };
    return (
      <Autocomplete onSelectionChange={handleSelectionChange} selectedKey={selectedKey} aria-label="Animals">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>
    );
  },
};

/**
 * > Disabled usage example
 */
export const DisabledStory: Story = {
  args: {
    isDisabled: true,
    'aria-label': 'Disable example',
    children: [
      <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>,
      <Autocomplete.Item key="cat">Cat</Autocomplete.Item>,
      <Autocomplete.Item key="dog">Dog</Autocomplete.Item>,
      <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>,
      <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>,
      <Autocomplete.Item key="snake">Snake</Autocomplete.Item>,
    ],
  },
};

/**
 * > Invalid usage example
 */
export const InvalidStory: Story = {
  args: {
    invalid: true,
    'aria-label': 'Invalid example',
    children: [
      <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>,
      <Autocomplete.Item key="cat">Cat</Autocomplete.Item>,
      <Autocomplete.Item key="dog">Dog</Autocomplete.Item>,
      <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>,
      <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>,
      <Autocomplete.Item key="snake">Snake</Autocomplete.Item>,
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
            <Autocomplete label={size} size={size as any} aria-label={`size ${size}`}>
              <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
              <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
              <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
              <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
              <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
              <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
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
          <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
          <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
          <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
          <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
          <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
          <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
          <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
          <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
          <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
          <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
          <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
          <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
          <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
          <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
          <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
          <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
          <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
          <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
          <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
          <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
          <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
          <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
          <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
          <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
        </Autocomplete>
      </div>
    );
  },
};
