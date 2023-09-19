import { render } from '@testing-library/react';

import { Input } from '../index.js';

import { Form } from './form.component.js';

describe('Form', () => {
  it('renders the component', () => {
    const { container } = render(
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
      </Form>,
    );
    expect(container).toBeInTheDocument();
  });
});
