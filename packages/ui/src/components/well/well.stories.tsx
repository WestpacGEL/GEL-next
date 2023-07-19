import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Well } from './well.component.js';

const meta: Meta<typeof Well> = {
  title: 'Example/Well',
  component: Well,
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

/**
 * > Default usage example
 */
export const DefaultUsage: Story = {
  args: {
    children: "Look, I'm in a well",
  },
};

/**
 * > Nested usage example
 */
export const NestedUsage: Story = {
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
export const CustomTagUsage: Story = {
  args: {
    tag: 'article',
    children: "Look, I'm in a well",
  },
};

/**
 * > Nested tag as <article>
 */
export const CustomTagNestedUsage: Story = {
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
export const ComplexCustomTagNestedUsage: Story = {
  args: {
    tag: 'aside',
    children: <span>Look, I'm in a well</span>,
  },
};
