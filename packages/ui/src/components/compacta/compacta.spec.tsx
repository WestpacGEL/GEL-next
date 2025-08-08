import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent, useState } from 'react';

import { Form, FormGroup, FormHint, FormLabel } from '../form/index.js';
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
            <FormGroup>
              <FormLabel htmlFor={`primary-${id}`}>Primary</FormLabel>
              <FormHint>Primary title text</FormHint>
              <Input
                name={`primary-${id}`}
                value={inputs[`primary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setPrimaryTitle(e.target.value);
                }}
                data-testid="input-one"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor={`secondary-${id}`}>Secondary</FormLabel>
              <FormHint>Secondary title text</FormHint>
              <Input
                name={`secondary-${id}`}
                value={inputs[`secondary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setSecondaryTitle(e.target.value);
                }}
                data-testid="input-two"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor={`tertiary-${id}`}>Tertiary</FormLabel>
              <FormHint>Tertiary title text</FormHint>
              <Input
                name={`tertiary-${id}`}
                value={inputs[`tertiary-${id}` as keyof typeof inputs] || ''}
                onChange={e => {
                  handleChange(e);
                  setTertiaryTitle(e.target.value);
                }}
                data-testid="input-three"
              />
            </FormGroup>
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
    const { getByText, getByLabelText } = render(<TestCompacta />);

    expect(getByText(textToQuery)).toBeInTheDocument();
    user.click(getByLabelText('1.'));
    await waitFor(() => expect(getByLabelText('1.')).toHaveAttribute('aria-expanded', 'false'));
  });

  it('should display input values when collapsed', async () => {
    // This test inconsistently shows a warning, it is likely related to motion
    const user = userEvent.setup();
    const { getByText, getByLabelText, queryByText, getByTestId } = render(<TestCompacta />);

    await act(() => user.type(getByTestId('input-one'), 'first'));
    await act(() => user.type(getByTestId('input-two'), 'second'));
    await act(() => user.type(getByTestId('input-three'), 'third'));

    user.click(getByLabelText('1.'));
    await waitFor(
      () => {
        expect(queryByText(textToQuery)).not.toBeInTheDocument();
        expect(getByText('first')).toBeInTheDocument();
        expect(getByText('second')).toBeInTheDocument();
        expect(getByText('third')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('should add another compacta when add button is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<TestCompacta />);

    user.click(getByRole('button', { name: 'Add another' }));

    await waitFor(() => {
      expect(getByText('2.')).toBeInTheDocument();
    });
  });

  it('should remove most recent compacta when remove button is pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<TestCompacta />);

    user.click(getByRole('button', { name: 'Add another' }));
    await waitFor(() => {
      expect(getByText('2.')).toBeInTheDocument();
    });
    user.click(getByRole('button', { name: 'remove item 2' }));
    await waitFor(() => {
      expect(queryByText('2.')).not.toBeInTheDocument();
    });
  });
});
