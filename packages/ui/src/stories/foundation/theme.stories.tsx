import { type Meta, StoryFn } from '@storybook/react-vite';

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
 * Providing brand theming is a matter of wrapping with HTML or div with data-brand="theme-name" and for light/dark mode with data-theme="light|dark" see code of story for example
 */
export const Theme = () => (
  /**
   * Valid brand tokens:
   * - bom
   * - bsa
   * - btfg
   * - stg
   * - wbc
   *
   * Valid theme tokens
   * - light
   * - dark
   */
  <div data-brand="wbc" data-theme="light">
    Click on show code
  </div>
);
