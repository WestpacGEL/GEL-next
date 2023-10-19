import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Well } from './well.component.js';

const meta: Meta<typeof Well> = {
  title: 'Components/Well',
  component: Well,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: "Look, I'm in a well",
  },
};

/**
 * > Nested usage example
 */
export const Nested: Story = {
  args: {
    children: (
      <>
        I am outside
        <Well color="white">I am inside</Well>
      </>
    ),
  },
};

/**
 * > Tag as <article>
 */
export const CustomTag: Story = {
  args: {
    tag: 'article',
    children: "Look, I'm in a well",
  },
};

/**
 * > Nested tag as <article>
 */
export const CustomTagNested: Story = {
  args: {
    tag: 'article',
    children: (
      <>
        I am outside
        <Well color="white">I am inside</Well>
      </>
    ),
  },
};

/**
 * > Tag as <aside> with child <san>, passed as a component
 */
export const ComplexCustomTagNested: Story = {
  args: {
    tag: 'aside',
    children: <span>Look, I'm in a well</span>,
  },
};
