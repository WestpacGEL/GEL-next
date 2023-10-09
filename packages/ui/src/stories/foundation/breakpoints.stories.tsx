import { type Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Breakpoints',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * > Breakpoints used in Tailwind config
 */
export const Breakpoints = () => (
  <ul>
    <li>xsl: 575px</li>
    <li>sm: 768px</li>
    <li>md: 992px</li>
    <li>lg: 1200px</li>
    <li>xl: 1900px</li>
  </ul>
);
