import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownHeading } from './components/dropdown-heading/dropdown-heading.component.js';
import { Dropdown } from './dropdown.component.js';

describe('Dropdown', () => {
  it('renders the component', () => {
    const { container } = render(<Dropdown text="test dropdown">Test content</Dropdown>);
    expect(container).toBeInTheDocument();
  });

  it('should show panel when button clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<Dropdown text="test dropdown">Test content</Dropdown>);
    act(() => {
      user.click(getByRole('button', { name: 'test dropdown' }));
    });
    await waitFor(() => expect(getByText('Test content')).toBeInTheDocument());
  });

  it('should close panel when esc key pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<Dropdown text="test esc">Test esc</Dropdown>);
    act(() => {
      user.click(getByRole('button', { name: 'test esc' }));
    });
    await waitFor(() => expect(getByText('Test esc')).toBeInTheDocument());
    act(() => {
      user.keyboard('[Escape]');
    });
    await waitFor(() => expect(queryByText('Test esc')).not.toBeInTheDocument());
  });

  it('should close panel when focus changes outside panel', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(
      <>
        <Dropdown text="test focus">Test focus</Dropdown>
        <input type="number" />
      </>,
    );
    act(() => {
      user.click(getByRole('button', { name: 'test focus' }));
    });
    await waitFor(() => expect(getByText('Test focus')).toBeInTheDocument());
    act(() => {
      user.tab();
    });
    await waitFor(() => expect(queryByText('Test focus')).not.toBeInTheDocument());
  });

  it('should render heading when heading added as child', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <Dropdown text="test heading">
        <DropdownHeading>Dropdown heading</DropdownHeading>
      </Dropdown>,
    );
    act(() => {
      user.click(getByRole('button', { name: 'test heading' }));
    });
    await waitFor(() => expect(getByText('Dropdown heading')).toBeInTheDocument());
  });

  it('should have correct styling when block', () => {
    const { getByRole } = render(
      <Dropdown text="test block" block>
        Test block
      </Dropdown>,
    );

    expect(getByRole('button', { name: 'test block' })).toHaveClass('w-full');
  });
});
