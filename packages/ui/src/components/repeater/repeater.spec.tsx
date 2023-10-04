import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Repeater } from './repeater.component.js';

describe('Repeater', () => {
  const queryText = /Test child/;
  const TestRepeater = () => {
    return (
      <Repeater>
        <p>Test child</p>
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
    await act(() => {
      user.click(getByRole('button', { name: 'Add another item' }));
    });
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(2));
  });

  it('should remove new repeater when button pressed', async () => {
    const user = userEvent.setup();
    const { queryAllByText, getByRole } = render(<TestRepeater />);
    expect(queryAllByText(queryText)).toHaveLength(1);
    await act(() => {
      user.click(getByRole('button', { name: 'Add another item' }));
    });
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(2));
    await act(() => {
      user.click(getByRole('button', { name: 'remove item 2' }));
    });
    await waitFor(() => expect(queryAllByText(queryText)).toHaveLength(1));
  });

  it('should have correct styling with separator prop passed', () => {
    const { getByText } = render(
      <Repeater separator>
        <p>Test child</p>
      </Repeater>,
    );
    expect(getByText('1.')).toBeInTheDocument();
  });
});
