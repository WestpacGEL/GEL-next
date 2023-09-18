import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Input } from '../index.js';

import { Form } from './form.component.js';

const meta: Meta<typeof Form> = {
  title: 'Example/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default size and spacing
 */
export const DefaultStory: Story = {
  args: {},
  render: () => {
    return (
      <Form>
        <Form.Label>This is a label</Form.Label>
        <Form.Hint>This is a hint</Form.Hint>
        <Form.ErrorMessage message="This is an error message" />
        <Input />
      </Form>
    );
  },
};

/**
 * > Multiple errors
 */
export const MultipleErrorsStory: Story = {
  args: {},
  render: () => {
    return (
      <Form>
        <Form.Label>This is a label</Form.Label>
        <Form.Hint>This is a hint</Form.Hint>
        <Form.ErrorMessage message={['This is an error message', 'another error message']} />
        <Input />
      </Form>
    );
  },
};

/**
 * > All sizes Story
 */
export const AllSizesStory: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        {(['small', 'medium'] as const).map(size => (
          <Form size={size}>
            <h3>Form with size: {size}</h3>
            <Form.Label>This is a label</Form.Label>
            <Form.Hint>This is a hint</Form.Hint>
            <Form.ErrorMessage message="This is an error message" />
            <Input />
          </Form>
        ))}
      </div>
    );
  },
};

/**
 * > All spacings Story
 */
export const AllSpacingsStory: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        {(['small', 'medium'] as const).map(size => (
          <Form spacing={size}>
            <h3>Form with Spacing:{size}</h3>
            <Form.Label>This is a label</Form.Label>
            <Form.Hint>This is a hint</Form.Hint>
            <Form.ErrorMessage message="This is an error message" />
            <Input />
          </Form>
        ))}
      </div>
    );
  },
};
