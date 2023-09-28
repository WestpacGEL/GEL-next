import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent, useState } from 'react';

import { Form } from '../form/index.js';
import { Input } from '../input/index.js';

import { Compacta } from './compacta.component.js';

describe('Compacta', () => {
  const textToQuery = 'Primary title text';
  const TestCompacta = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((prev: object) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
      <Compacta>
        {({ id, setPrimaryTitle, setSecondaryTitle, setTertiaryTitle }) => (
          <Form>
            <Form.Group>
              <Form.Label htmlFor={`primary-${id}`}>Primary</Form.Label>
              <Form.Hint>Primary title text</Form.Hint>
              <Input
                name={`primary-${id}`}
                value={inputs[`primary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setPrimaryTitle(e.target.value);
                }}
                data-testid="input-one"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={`secondary-${id}`}>Secondary</Form.Label>
              <Form.Hint>Secondary title text</Form.Hint>
              <Input
                name={`secondary-${id}`}
                value={inputs[`secondary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setSecondaryTitle(e.target.value);
                }}
                data-testid="input-two"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor={`tertiary-${id}`}>Tertiary</Form.Label>
              <Form.Hint>Tertiary title text</Form.Hint>
              <Input
                name={`tertiary-${id}`}
                value={inputs[`tertiary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setTertiaryTitle(e.target.value);
                }}
                data-testid="input-three"
              />
            </Form.Group>
          </Form>
        )}
      </Compacta>
    );
  };

  it('renders the component', () => {
    const { container } = render(<TestCompacta />);
    expect(container).toBeInTheDocument();
  });

  it('should hide contents of compacta when button pressed', async () => {
    const user = userEvent.setup();
    const { getByText, getByLabelText, queryByText } = render(<TestCompacta />);

    expect(getByText(textToQuery)).toBeInTheDocument();
    await act(() => {
      user.click(getByLabelText('1.'));
    });
    await waitFor(() => {
      expect(queryByText(textToQuery)).not.toBeInTheDocument();
    });
  });

  it('should display input values when collapsed', async () => {
    const user = userEvent.setup();
    const { getByText, getByLabelText, queryByText, getByTestId } = render(<TestCompacta />);

    await act(() => userEvent.type(getByTestId('input-one'), 'first'));
    await act(() => userEvent.type(getByTestId('input-two'), 'second'));
    await act(() => userEvent.type(getByTestId('input-three'), 'third'));

    await act(() => {
      user.click(getByLabelText('1.'));
    });
    await waitFor(() => {
      expect(queryByText(textToQuery)).not.toBeInTheDocument();
      expect(getByText('first')).toBeInTheDocument();
      expect(getByText('second')).toBeInTheDocument();
      expect(getByText('third')).toBeInTheDocument();
    });
  });

  it('should add another compacta when add button is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<TestCompacta />);

    await act(() => {
      user.click(getByRole('button', { name: 'Add another' }));
    });
    await waitFor(() => {
      expect(getByText('2.')).toBeInTheDocument();
    });
  });

  it('should remove most recent compacta when remove button is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<TestCompacta />);

    await act(() => {
      user.click(getByRole('button', { name: 'Add another' }));
    });
    await waitFor(() => {
      expect(getByText('2.')).toBeInTheDocument();
    });
    await act(() => {
      user.click(getByRole('button', { name: 'remove item 2' }));
    });
    await waitFor(() => {
      expect(queryByText('2.')).not.toBeInTheDocument();
    });
  });
});
