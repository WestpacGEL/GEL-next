import { action } from 'storybook/actions';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { PassCodeView } from './pass-code-view.component.js';

const meta: Meta<typeof PassCodeView> = {
  title: 'Components/PassCodeView',
  component: PassCodeView,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
    header: 'Enter SMS code',
    description: 'Send to mobile ending ...XXXX',
    passCodeLength: 6,
    onComplete: action('onComplete'),
    onResend: action('onResend'),
    onUpdate: action('onUpdate'),
  },
};

/**
 * > With error example
 */
export const WithErrorStory: Story = {
  args: {
    header: 'Enter SMS code',
    description: 'Send to mobile ending ...XXXX',
    passCodeLength: 6,
    errorMessage: 'Try again (2 attempts remaining)',
    onComplete: action('onComplete'),
    onResend: action('onResend'),
    onUpdate: action('onUpdate'),
  },
};
