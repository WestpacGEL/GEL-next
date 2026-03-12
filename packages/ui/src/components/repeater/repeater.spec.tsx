import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useState } from 'react';

import { RepeaterItem } from './components/repeater-item/repeater-item.component.js';
import { Repeater } from './repeater.component.js';

describe('Repeater', () => {
  const queryText = /Test child/;
  const TestRepeater = () => {
    const [items, setItems] = useState(['Test child']);

    const handleAdd = useCallback(() => {
      setItems(items => [...items, 'Test child']);
    }, []);

    const handleRemove = useCallback((index: number) => {
      setItems(items => [...items.slice(0, index), ...items.slice(index + 1)]);
    }, []);

    return (
      <Repeater onAdd={handleAdd}>
        {items.map((item, index) => (
          <RepeaterItem key={item} onRemove={() => handleRemove(index)}>
            <p>{item}</p>
          </RepeaterItem>
        ))}
      </Repeater>
    );
  };

  it('renders the component', () => {
    const { container } = render(<TestRepeater />);
    expect(container).toBeInTheDocument();
  });

  it('should add new repeater when button pressed', async () => {
    const user = userEvent.setup();
    const { queryAllByText, getByRole } = render(<TestRepeater />);
    expect(queryAllByText(queryText)).toHaveLength(1);
    user.click(getByRole('button', { name: 'Add another item' }));
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(2));
  });

  it('should remove new repeater when button pressed', async () => {
    const user = userEvent.setup();
    const { queryAllByText, getByRole, findByRole } = render(<TestRepeater />);
    expect(queryAllByText(queryText)).toHaveLength(1);
    user.click(getByRole('button', { name: 'Add another item' }));
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(2));
    user.click(await findByRole('button', { name: 'Remove item 2' }));
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(1));
  });

  it('should have correct styling with separator prop passed', () => {
    const { getByText } = render(
      <Repeater separator>
        <RepeaterItem>
          <p>Test child</p>
        </RepeaterItem>
      </Repeater>,
    );
    expect(getByText('1.')).toBeInTheDocument();
  });
});
