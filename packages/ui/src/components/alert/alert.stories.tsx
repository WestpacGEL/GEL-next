import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { TelephoneIcon } from '../icon/index.js';

import { Alert } from './alert.component.js';

const meta: Meta<typeof Alert> = {
  title: 'Example/Alert',
  component: Alert,
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
    children: 'This is a default alert',
  },
};

/**
 * > All looks example
 */
export const LooksStory: Story = {
  render: () => (
    <>
      <Alert look="info">
        <strong>Heads up!</strong> This alert needs your attention, but it’s not super important. <a href="#">Link</a>
      </Alert>
      <Alert look="success">
        <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
      </Alert>
      <Alert look="warning">
        <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
      </Alert>
      <Alert look="danger">
        <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
      </Alert>
      <Alert look="system">
        <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
        inconvenience. <a href="#">Link</a>
      </Alert>
    </>
  ),
  args: {},
};

/**
 * > Text mode example
 */
export const TextStory: Story = {
  render: () => (
    <>
      <Alert look="info" mode="text">
        <strong>Heads up!</strong> This alert needs your attention, but it’s not super important. <a href="#">Link</a>
      </Alert>
      <Alert look="success" mode="text">
        <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
      </Alert>
      <Alert look="warning" mode="text">
        <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
      </Alert>
      <Alert look="danger" mode="text">
        <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
      </Alert>
      <Alert look="system" mode="text">
        <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
        inconvenience. <a href="#">Link</a>
      </Alert>
    </>
  ),
  args: {},
};

/**
 * > Heading example
 */
export const HeadingStory: Story = {
  args: {
    heading: 'I am an alert heading',
    children: 'This is a default alert',
  },
};

/**
 * > Dismissible example
 */
export const DismissibleStory: Story = {
  args: {
    dismissible: true,
    children:
      'I am an alert. This alert needs your attention, but it’s not super important. Hey neato, I can be closed.',
    onClose: () => console.log('closed'),
  },
};

/**
 * > Custom icon example
 */
export const CustomIconStory: Story = {
  args: {
    icon: TelephoneIcon,
    children: 'I am an alert. This alert needs your attention, but it’s not super important.',
  },
};
