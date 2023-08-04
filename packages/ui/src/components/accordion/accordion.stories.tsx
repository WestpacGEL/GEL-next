import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { Button } from '../index.js';

import { Accordion } from './accordion.component.js';

const meta: Meta<typeof Accordion> = {
  title: 'Example/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
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
    rounded: true,
    color: undefined,
    children: [
      { key: 'files', title: 'My files' },
      { key: 'shared', title: 'Shared with us' },
      { key: 'last', title: 'Last item' },
    ].map(({ key, title }) => (
      <Accordion.Item key={key} title={title}>
        <h3>{title}</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat in, nobis itaque iste sequi, pariatur, nam
          reiciendis quasi illum nulla aliquid mollitia corrupti nostrum incidunt? At minima error nobis ullam!
        </p>
        <Button>Test</Button>
      </Accordion.Item>
    )),
  },
};

/**
 * > Primary color usage example
 */
export const PrimaryColorStory: Story = {
  args: {
    color: 'primary',
    rounded: false,
  },
  render: ({ ...props }) => (
    <Accordion {...props}>
      {[
        { key: 'colors', title: 'Your colors' },
        { key: 'shared', title: 'Shared color' },
        { key: 'last', title: 'Last item' },
      ].map(({ key, title }) => (
        <Accordion.Item key={key} title={title}>
          <p>{title}</p>
          <Button>Test</Button>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

/**
 * > Hero color usage example
 */
export const HeroColorStory: Story = {
  args: {
    color: 'hero',
    rounded: false,
  },
  render: ({ ...props }) => (
    <Accordion {...props}>
      {[
        { key: 'files', title: 'My files' },
        { key: 'shared', title: 'my shared with you' },
        { key: 'last', title: 'Last item' },
      ].map(({ key, title }) => (
        <Accordion.Item key={key} title={title}>
          <p>{title}</p>
          <Button>Test</Button>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

/**
 * > Hero color usage example
 */
export const MaterialLookStory: Story = {
  args: {
    look: 'material',
    rounded: false,
  },
  render: ({ ...props }) => (
    <Accordion {...props}>
      {[
        { key: 'files', title: 'Your files' },
        { key: 'shared', title: 'Shared with you' },
        { key: 'last', title: 'Last item' },
      ].map(({ key, title }) => (
        <Accordion.Item key={key} title={title}>
          <p>{title}</p>
          <Button>Test</Button>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

/**
 * > Controlled example
 */
export const ControlledColorStory: Story = {
  args: {
    color: 'hero',
    rounded: false,
  },
  render: ({ ...props }) => {
    const [expandedKeys, setExpandedKeys] = useState<Set<Key>>();
    return (
      <Accordion
        {...props}
        expandedKeys={expandedKeys}
        onExpandedChange={keys => {
          setExpandedKeys(keys);
        }}
      >
        {[
          { key: 'files', title: 'Your files' },
          { key: 'shared', title: 'Shared with you' },
          { key: 'last', title: 'Last item' },
        ].map(({ key, title }) => (
          <Accordion.Item key={key} title={title}>
            <p>{title}</p>
            <Button>Test</Button>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};
