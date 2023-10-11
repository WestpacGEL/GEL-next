import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { AndroidIcon } from '../icon/index.js';

import { List } from './list.component.js';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-2">
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

const LOOKS = ['primary', 'hero', 'neutral', 'success', 'danger', 'link'];
const TYPES = ['bullet', 'link', 'tick', 'cross', 'unstyled', 'icon', 'ordered'];

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <List.Item>Styled list</List.Item>,
      <List.Item>Styled list</List.Item>,
      <List.Item>Styled list</List.Item>,
    ],
  },
};

/**
 * > Type of list
 */
export const Types = () =>
  TYPES.map((type: any) => (
    <div className="mb-2" key={type}>
      <h1 className="typography-body-8">{type}</h1>
      <List type={type} icon={type === 'icon' ? AndroidIcon : undefined}>
        <List.Item href={type === 'link' ? '#' : undefined}>Styled {type} list</List.Item>
        <List.Item href={type === 'link' ? '#' : undefined}>Styled {type} list</List.Item>
        <List.Item href={type === 'link' ? '#' : undefined}>Styled {type} list</List.Item>
        <List icon={type === 'link' ? AndroidIcon : undefined}>
          <List.Item>Styled {type} list</List.Item>
          <List.Item>Styled {type} list</List.Item>
          <List.Item>Styled {type} list</List.Item>
        </List>
        <List.Item>Styled {type} list</List.Item>
      </List>
    </div>
  ));

/**
 * > Type of list
 */
export const Looks = () =>
  LOOKS.map((look: any) => (
    <div className="mb-2" key={look}>
      <h1 className="typography-body-8">{look}</h1>
      <List look={look} type="bullet">
        <List.Item>Styled {look} list</List.Item>
        <List.Item>Styled {look} list</List.Item>
        <List.Item>Styled {look} list</List.Item>
        <List icon={look === 'link' ? AndroidIcon : undefined}>
          <List.Item>Styled {look} list</List.Item>
          <List.Item>Styled {look} list</List.Item>
          <List.Item>Styled {look} list</List.Item>
        </List>
        <List.Item>Styled {look} list</List.Item>
      </List>
    </div>
  ));

/**
 * Nested list
 */
export const Nested = () => (
  <div>
    <List type="bullet" assistiveText="test">
      <List.Item>Styled list</List.Item>
      <List.Item>Styled list</List.Item>
      <List.Item>Styled list</List.Item>
      <List>
        <List.Item>Styled list</List.Item>
        <List.Item>Styled list</List.Item>
        <List.Item>Styled list</List.Item>
        <List nested={0}>
          <List.Item>Styled list</List.Item>
          <List.Item>Styled list</List.Item>
          <List.Item>Styled list</List.Item>
          <List>
            <List.Item>Styled list</List.Item>
            <List.Item>Styled list</List.Item>
            <List.Item>Styled list</List.Item>
          </List>
        </List>
      </List>
    </List>
  </div>
);

/**
 * List spacing
 */
export const Spacing = () => (
  <div>
    <h1 className="typography-body-10 mb-2">Medium</h1>
    <List type="bullet" className="mb-4" spacing="medium">
      <List.Item>Styled bullet list</List.Item>
      <List.Item>Styled bullet list</List.Item>
      <List.Item>Styled bullet list</List.Item>
    </List>
    <h1 className="typography-body-10 mb-2">Large</h1>
    <List type="bullet" className="mb-4" spacing="large">
      <List.Item>Styled bullet list</List.Item>
      <List.Item>Styled bullet list</List.Item>
      <List.Item>Styled bullet list</List.Item>
    </List>
  </div>
);
