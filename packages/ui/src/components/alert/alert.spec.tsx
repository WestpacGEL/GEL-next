import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { TelephoneIcon } from '../icon/index.js';

import { Alert } from './alert.component.js';
import { styles } from './alert.styles.js';

describe('Alert', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(<Alert />);
    expect(container).toBeInTheDocument();
  });

  it('generates the base style correctly', () => {
    const style = styles({ look: 'info', mode: 'box' });
    expect(style.base()).toBe(
      'typography-body-10 relative mb-4 p-3 xsl:flex text-info border-y border-info-50 bg-info-5',
    );
  });

  it('displays an icon', () => {
    render(<Alert />);
    expect(screen.getByRole('img', { name: 'Info' })).toBeInTheDocument();
  });

  it('replaces the icon when passed', () => {
    render(<Alert icon={TelephoneIcon} />);
    expect(screen.getByRole('img', { name: 'Telephone' })).toBeInTheDocument();
  });

  it('adds a heading', () => {
    render(<Alert heading="Heading Text" />);
    expect(screen.getByRole('heading', { name: 'Heading Text' })).toBeInTheDocument();
  });

  it('displays the body text', () => {
    render(<Alert>Alert text</Alert>);
    expect(screen.getByText('Alert text')).toBeInTheDocument();
  });

  const closeBtn = 'Close alert';

  it('should render a close button when dismissable', () => {
    render(<Alert dismissible />);
    expect(screen.getByRole('button', { name: closeBtn })).toBeInTheDocument();
  });

  it('should be removed when the close button is clicked', async () => {
    render(<Alert data-testid="alert" dismissible />);
    await act(() => {
      user.click(screen.getByRole('button', { name: closeBtn }));
    });
    await waitForElementToBeRemoved(() => screen.getByTestId('alert'));
  });

  it('calls the onClose callback when dismissed', async () => {
    const handleClose = vi.fn();
    render(<Alert dismissible onClose={handleClose} />);
    await act(() => {
      user.click(screen.getByRole('button', { name: closeBtn }));
    });
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
