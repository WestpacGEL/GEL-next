import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { ErrorMessage, FormChitChat, FormGroup, FormSection, Hint, Input, Label } from '../index.js';

import { Form } from './form.component.js';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default size and spacing
 */
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <>
        <h2 className="typography-body-7 my-4 font-bold text-text-body">Default size and spacing</h2>
        <Form>
          <FormSection>
            <FormChitChat>
              Hello, I’m the friendly conversational text component. I live at the top of the form pod if required.
            </FormChitChat>
          </FormSection>

          <FormSection>
            <FormGroup>
              <Label htmlFor="example-default-1">This is a label</Label>
              <Hint id="example-default-1-hint">This is a hint</Hint>
              <ErrorMessage message="This is an error message" id="example-default-1-error" />
              <Input
                name="example-default-1"
                id="example-default-1"
                aria-describedby="example-default-1-hint example-default-1-error"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="example-default-2">This is a label</Label>
              <Hint id="example-default-2-hint">This is a hint</Hint>
              <ErrorMessage message="This is an error message" id="example-default-2-error" />
              <Input
                name="example-default-2"
                id="example-default-2"
                aria-describedby="example-default-2-hint example-default-2-error"
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <FormGroup>
              <Label htmlFor="example-default-3">This is a label</Label>
              <Hint id="example-default-3-hint">This is a hint</Hint>
              <ErrorMessage message="This is an error message" id="example-default-3-error" />
              <Input
                name="example-default-3"
                id="example-default-3"
                aria-describedby="example-default-3-hint example-default-3-error"
              />
            </FormGroup>
          </FormSection>
        </Form>

        <hr className="my-4 border-t border-t-border" />

        <h2 className="typography-body-7 my-4 font-bold text-text-body">Large size with large spacing</h2>
        <Form spacing="large">
          <FormSection>
            <FormChitChat>
              Spacing increases space after label, hint and form group. Sizing can be changed via props on the component
              that needs to be bigger i.e. input.
            </FormChitChat>
          </FormSection>

          <FormSection>
            <FormGroup>
              <Label htmlFor="example-large-1">This is a label</Label>
              <Hint id="example-large-1-hint">This is a hint</Hint>
              <ErrorMessage message="This is an error message" id="example-large-1-error" />
              <Input
                name="example-large-1"
                size="large"
                id="example-large-1"
                aria-describedby="example-large-1-hint example-large-1-error"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="example-large-2">This is a label</Label>
              <Hint id="example-large-2-hint">This is a hint</Hint>
              <ErrorMessage id="example-large-2-error" message="This is an error message" />
              <Input
                name="example-large-2"
                size="large"
                id="example-large-2"
                aria-describedby="example-large-2-hint example-large-2-error"
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <FormGroup>
              <Label htmlFor="example-large-3">This is a label</Label>
              <Hint id="example-large-3-hint">This is a hint</Hint>
              <ErrorMessage message="This is an error message" id="example-large-3-error" />
              <Input
                name="example-large-3"
                size="large"
                id="example-large-3"
                aria-describedby="example-large-3-hint example-large-3-error"
              />
            </FormGroup>
          </FormSection>
        </Form>
      </>
    );
  },
};

/**
 * > Multiple errors
 */
export const MultipleErrors: Story = {
  args: {},
  render: () => {
    return (
      <Form>
        <Label htmlFor="example-m-errors">This is a label</Label>
        <Hint id="example-m-errors-hint">This is a hint</Hint>
        <ErrorMessage message={['This is an error message', 'another error message']} id="example-m-errors-message" />
        <Input id="example-m-errors" aria-describedby="example-m-errors-hint example-m-errors-message" />
      </Form>
    );
  },
};

/**
 * > All sizes Story
 */
export const Size: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        <Form>
          <h3>Sizing is currently handled on the child level. See example of size prop on Input component in code.</h3>
          <Label htmlFor="example-size">This is a label</Label>
          <Hint id="example-size-hint">This is a hint</Hint>
          <ErrorMessage message="This is an error message" id="example-size-error" />
          <Input size="large" id="example-size" aria-describedby="example-size-hint example-size-error" />
        </Form>
      </div>
    );
  },
};

/**
 * > All spacings Story. Increases space between label, hint and form groups
 */
export const AllSpacings: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        {(['medium', 'large'] as const).map(size => (
          <Form key={size} spacing={size}>
            <h3>Form with Spacing:{size}. Sets spacing between label, hint and form groups.</h3>
            <Label htmlFor={`space-${size}`}>This is a label</Label>
            <Hint id={`space-${size}-hint`}>This is a hint</Hint>
            <ErrorMessage message="This is an error message" id={`space-${size}-error`} />
            <Input id={`space-${size}`} aria-describedby={`space-${size}-hint space-${size}-error`} />
          </Form>
        ))}
      </div>
    );
  },
};
