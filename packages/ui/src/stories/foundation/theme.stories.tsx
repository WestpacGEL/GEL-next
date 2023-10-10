import { type Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Theme',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * Providing themeing is a matter of wrapping with HTML or div with data-theme="theme-name", see code of story for example
 */
export const Theme = () => (
  /**
   * Valid theme tokens:
   * BOM
   * BSA
   * BTFG
   * RAMS
   * STG
   * WBC
   * WBG
   */
  <div data-theme="WBC">Click on show code</div>
);
