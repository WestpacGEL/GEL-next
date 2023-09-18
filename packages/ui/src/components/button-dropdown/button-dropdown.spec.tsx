import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonDropdown } from './button-dropdown.component.js';

describe('ButtonDropdown', () => {
  it('renders the component', () => {
    const { container } = render(<ButtonDropdown text="test dropdown">Test content</ButtonDropdown>);
    expect(container).toBeInTheDocument();
  });

  it('should show panel when button clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<ButtonDropdown text="test dropdown">Test content</ButtonDropdown>);
    await act(() => {
      user.click(getByRole('button', { name: 'test dropdown' }));
    });
    await waitFor(() => expect(getByText('Test content')).toBeInTheDocument());
  });

  it('should close panel when esc key pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<ButtonDropdown text="test esc">Test esc</ButtonDropdown>);
    await act(() => {
      user.click(getByRole('button', { name: 'test esc' }));
    });
    await waitFor(() => expect(getByText('Test esc')).toBeInTheDocument());
    await act(() => {
      user.keyboard('[Escape]');
    });
    await waitFor(() => expect(queryByText('Test esc')).not.toBeInTheDocument());
  });

  it('should close panel when focus changes outside panel', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(
      <>
        <ButtonDropdown text="test focus">Test focus</ButtonDropdown>
        <input type="number" />
      </>,
    );
    await act(() => {
      user.click(getByRole('button', { name: 'test focus' }));
    });
    await waitFor(() => expect(getByText('Test focus')).toBeInTheDocument());
    await act(() => {
      user.tab();
    });
    await waitFor(() => expect(queryByText('Test focus')).not.toBeInTheDocument());
  });

  it('should render heading when heading added as child', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <ButtonDropdown text="test heading">
        <ButtonDropdown.Heading>Dropdown heading</ButtonDropdown.Heading>
      </ButtonDropdown>,
    );
    await act(() => {
      user.click(getByRole('button', { name: 'test heading' }));
    });
    await waitFor(() => expect(getByText('Dropdown heading')).toBeInTheDocument());
  });

  it('should have correct styling when block', async () => {
    const { getByRole } = render(
      <ButtonDropdown text="test block" block>
        Test block
      </ButtonDropdown>,
    );

    expect(getByRole('button', { name: 'test block' })).toHaveClass('w-full');
  });
});
