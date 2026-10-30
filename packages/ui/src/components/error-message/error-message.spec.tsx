import { render, screen } from '@testing-library/react';

import { ErrorMessage } from './error-message.component.js';

describe('ErrorMessage', () => {
  it.each([
    { message: 'Enter your first name' },
    { message: ['Enter your first name', 'Enter your last name'] },
    { message: ['Enter your first name', 'Enter your last name'], errorTitle: 'Check your name' },
  ])('renders accessible error text with decorative icons: %j', props => {
    render(<ErrorMessage {...props} />);

    for (const message of [props.message].flat()) {
      expect(screen.getByText(message)).toBeVisible();
    }
    if (props.errorTitle) {
      expect(screen.getByText(props.errorTitle)).toBeVisible();
    }
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    for (const icon of screen.getAllByRole('img', { hidden: true })) {
      expect(icon).toBeVisible();
    }
  });
});
