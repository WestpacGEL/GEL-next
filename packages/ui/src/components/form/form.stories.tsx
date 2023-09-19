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
      <>
        <h2 className="typography-body-7 my-4">Default size and spacing</h2>
        <Form>
          <Form.Section>
            <Form.ChitChat>
              Hello, I’m the friendly conversational text component. I live at the top of the form pod if required.
            </Form.ChitChat>
          </Form.Section>

          <Form.Section>
            <Form.Group>
              <Form.Label htmlFor="example-default-1">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-default-1" />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="example-default-2">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-default-2" />
            </Form.Group>
          </Form.Section>

          <Form.Section>
            <Form.Group>
              <Form.Label htmlFor="example-default-3">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-default-3" />
            </Form.Group>
          </Form.Section>
        </Form>

        <hr />

        <h2 className="typography-body-7 my-4">Large size with large spacing</h2>
        <Form size="large" spacing="large">
          <Form.Section>
            <Form.ChitChat>
              Hello, I’m the friendly conversational text component. I live at the top of the form pod if required.
            </Form.ChitChat>
          </Form.Section>

          <Form.Section>
            <Form.Group>
              <Form.Label htmlFor="example-large-1">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-large-1" />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="example-large-2">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-large-2" />
            </Form.Group>
          </Form.Section>

          <Form.Section>
            <Form.Group>
              <Form.Label htmlFor="example-large-3">This is a label</Form.Label>
              <Form.Hint>This is a hint</Form.Hint>
              <Form.ErrorMessage message="This is an error message" />
              <Input name="example-large-3" />
            </Form.Group>
          </Form.Section>
        </Form>
      </>
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
