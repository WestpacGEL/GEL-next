import { render } from '@testing-library/react';

import { ErrorMessage, FormChitChat, FormGroup, FormSection, Hint, Input, Label } from '../index.js';

import { Form } from './form.component.js';

describe('Form', () => {
  it('renders the component', () => {
    const { container } = render(
      <Form>
        <FormSection>
          <FormChitChat>
            Hello, I’m the friendly conversational text component. I live at the top of the form pod if required.
          </FormChitChat>
        </FormSection>

        <FormSection>
          <FormGroup>
            <Label htmlFor="example-default-1">This is a label</Label>
            <Hint>This is a hint</Hint>
            <ErrorMessage message="This is an error message" />
            <Input name="example-default-1" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="example-default-2">This is a label</Label>
            <Hint>This is a hint</Hint>
            {/* <ErrorMessage message="This is an error message" /> */}
            <Input name="example-default-2" />
          </FormGroup>
        </FormSection>

        <FormSection>
          <FormGroup>
            <Label htmlFor="example-default-3">This is a label</Label>
            <Hint>This is a hint</Hint>
            {/* <ErrorMessage message="This is an error message" /> */}
            <Input name="example-default-3" />
          </FormGroup>
        </FormSection>
      </Form>,
    );
    expect(container).toBeInTheDocument();
  });
});
