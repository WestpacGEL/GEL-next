/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { TelephoneIcon } from '../icon/index.js';

import { Alert } from './alert.component.js';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
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
    children: 'This is a default alert',
  },
};

/**
 * > All looks example
 */
export const Looks: Story = {
  render: () => (
    <>
      <h3 className="typography-body-8 font-bold">Info</h3>
      <Alert look="info">
        <strong>Heads up!</strong> This alert needs your attention, but it’s not super important. <a href="#">Link</a>
      </Alert>
      <h3 className="typography-body-8 font-bold">Success</h3>
      <Alert look="success">
        <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
      </Alert>
      <h3 className="typography-body-8 font-bold">Warning</h3>
      <Alert look="warning">
        <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
      </Alert>
      <h3 className="typography-body-8 font-bold">Danger</h3>
      <Alert look="danger">
        <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
      </Alert>
      <h3 className="typography-body-8 font-bold">System</h3>
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
export const TextMode: Story = {
  render: () => (
    <>
      <h2 className="mb-2 typography-body-8 font-bold">Default</h2>
      <h3 className="pb-2 font-bold">Info</h3>
      <Alert look="info" mode="text">
        <strong>Heads up!</strong> This alert needs your attention, but it’s not super important. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">Success</h3>
      <Alert look="success" mode="text">
        <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">Warning</h3>
      <Alert look="warning" mode="text">
        <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">Danger</h3>
      <Alert look="danger" mode="text">
        <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">System</h3>
      <Alert look="system" mode="text">
        <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
        inconvenience. <a href="#">Link</a>
      </Alert>
      <h2 className="mb-2 pt-4 typography-body-8 font-bold">Custom Icon Sizes</h2>
      <h3 className="pb-2 font-bold">Medium</h3>
      <Alert look="info" iconSize="medium" mode="text">
        <strong>Medium</strong> This alert has a medium icon. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">Small</h3>
      <Alert look="info" iconSize="small" mode="text">
        <strong>Small</strong> This alert has a small icon. <a href="#">Link</a>
      </Alert>
      <h3 className="pb-2 font-bold">Extra Small</h3>
      <Alert look="info" iconSize="xsmall" mode="text">
        <strong>Extra Small</strong> This alert has an extra small icon. <a href="#">Link</a>
      </Alert>
    </>
  ),
  args: {},
};

/**
 * > Heading example
 */
export const Heading: Story = {
  args: {
    heading: 'I am an alert heading',
    children: 'This is a default alert',
  },
};

/**
 * > Dismissible example
 */
export const Dismissible: Story = {
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
export const CustomIcon: Story = {
  render: () => (
    <>
      <h3 className="mb-2 typography-body-8 font-bold">Info</h3>
      <Alert look="info" icon={TelephoneIcon}>
        <strong>Heads up!</strong> This alert needs your attention, but it’s not super important. <a href="#">Link</a>
      </Alert>
      <h3 className="mb-2 typography-body-8 font-bold">Note: the following should not render a custom icon</h3>
      <h3 className="mb-2 typography-body-8 font-bold">Success</h3>
      <Alert look="success" icon={TelephoneIcon}>
        <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
      </Alert>
      <h3 className="mb-2 typography-body-8 font-bold">Warning</h3>
      <Alert look="warning" icon={TelephoneIcon}>
        <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
      </Alert>
      <h3 className="mb-2 typography-body-8 font-bold">Danger</h3>
      <Alert look="danger" icon={TelephoneIcon}>
        <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
      </Alert>
      <h3 className="mb-2 typography-body-8 font-bold">System</h3>
      <Alert look="system" icon={TelephoneIcon}>
        <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
        inconvenience. <a href="#">Link</a>
      </Alert>
    </>
  ),
};
