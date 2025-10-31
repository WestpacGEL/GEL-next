import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { CompactaProps, Field } from '../index.js';
import { Input } from '../input/index.js';

import { Compacta } from './compacta.component.js';
import { CompactaItem } from './components/compacta-item/compacta-item.component.js';

type Inputs = {
  items: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  }[];
};

describe('Compacta', () => {
  const textToQuery = 'Primary title text';
  const TestCompacta = ({
    items: itemsProps,
    ...props
  }: Partial<CompactaProps & { onRemove?: (index: number) => unknown; items?: Inputs['items'] }>) => {
    const { register, watch, setValue } = useForm<Inputs>({ defaultValues: { items: itemsProps || [] } });
    const items = watch('items');

    const handleAdd = useCallback(() => {
      setValue('items', [...items, { primary: '', secondary: '', tertiary: '' }]);
    }, [items, setValue]);

    const handleRemove = useCallback(
      (index: number) => {
        setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
      },
      [items, setValue],
    );

    return (
      <Compacta onAdd={handleAdd} {...props}>
        {items.map((item, index) => (
          <CompactaItem
            key={index}
            title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
            onRemove={() => (props.onRemove ? props.onRemove(index) : handleRemove(index))}
          >
            <Field label="Primary" hintMessage="Primary title text">
              <Input data-testid="input-one" {...register(`items.${index}.primary`)} />
            </Field>
            <Field label="Secondary" hintMessage="Secondary title text">
              <Input data-testid="input-two" {...register(`items.${index}.secondary`)} />
            </Field>
            <Field label="Tertiary" hintMessage="Tertiary title text">
              <Input data-testid="input-three" {...register(`items.${index}.tertiary`)} />
            </Field>
          </CompactaItem>
        ))}
      </Compacta>
    );
  };

  it('renders the component', () => {
    const { container } = render(<TestCompacta />);
    expect(container).toBeInTheDocument();
  });

  it('should hide contents of compacta when button pressed', async () => {
    const user = userEvent.setup();
    const { getByText, getByLabelText } = render(
      <TestCompacta items={[{ primary: '', secondary: '', tertiary: '' }]} />,
    );

    expect(getByText(textToQuery)).toBeInTheDocument();
    user.click(getByLabelText('Collapse 1'));
    await waitFor(() => expect(getByLabelText('Expand 1')).toHaveAttribute('aria-expanded', 'false'));
  });

  it('should display input values when collapsed', async () => {
    // This test inconsistently shows a warning, it is likely related to motion
    const user = userEvent.setup();
    const { getByText, getByLabelText, queryByText, getByTestId } = render(
      <TestCompacta items={[{ primary: '', secondary: '', tertiary: '' }]} />,
    );

    await act(() => user.type(getByTestId('input-one'), 'first'));
    await act(() => user.type(getByTestId('input-two'), 'second'));
    await act(() => user.type(getByTestId('input-three'), 'third'));

    user.click(getByLabelText('Collapse 1'));
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
    const handleAdd = vi.fn();

    const { getByRole } = render(<TestCompacta onAdd={handleAdd} />);

    user.click(getByRole('button', { name: 'Add another' }));
    await waitFor(() => expect(handleAdd).toHaveBeenCalledTimes(1));
  });

  it('should remove most recent compacta when remove button is pressed', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    const { getByRole } = render(
      <TestCompacta
        onRemove={handleRemove}
        items={[{ primary: 'primary', secondary: 'secondary', tertiary: 'tertiary' }]}
      />,
    );

    user.click(getByRole('button', { name: 'Remove item 1' }));
    await waitFor(() => expect(handleRemove).toHaveBeenCalledTimes(1));
  });
});
