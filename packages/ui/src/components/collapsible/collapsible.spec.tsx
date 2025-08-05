import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Collapsible } from './collapsible.component.js';

describe('Collapsible', () => {
  it('renders the component', () => {
    const { container } = render(<Collapsible text="test button">Test Text</Collapsible>);
    expect(container).toBeInTheDocument();
  });

  it('should show the content as default if open prop is possed', () => {
    const { getByText } = render(
      <Collapsible text="test button" open>
        Test Text
      </Collapsible>,
    );
    expect(getByText('Test Text')).toBeInTheDocument();
  });

  it('should show the content when the button is clicked', async () => {
    const user = userEvent.setup();
    const { getByText, getByRole } = render(<Collapsible text="test button">Test Text</Collapsible>);
    expect(screen.queryByText('Test Text')).not.toBeInTheDocument();
    act(() => {
      user.click(getByRole('button', { name: 'test button' }));
    });
    await waitFor(() => expect(getByText('Test Text')).toBeInTheDocument());
  });

  it('should call onClick when custom onClick passed as prop', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { getByRole } = render(
      <Collapsible text="test button" onClick={onClick}>
        Test Text
      </Collapsible>,
    );
    act(() => {
      user.click(getByRole('button', { name: 'test button' }));
    });
    await waitFor(() => expect(onClick).toBeCalled());
  });
});
