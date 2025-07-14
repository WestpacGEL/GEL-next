import { render, screen } from '@testing-library/react';

import { DatePicker } from './date-picker.component.js';

describe('DatePicker', () => {
  it('renders the custom date picker element, bind the parse and format functions to the date adaptor', async () => {
    render(<DatePicker />);
    const el = await screen.findByText('duet-ds-date-picker');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('data-parse-date')).toBe('2012-12-12T00:00:00.000Z');
    expect(el.getAttribute('data-formatted-date')).toBe('04-12-2029');
  });
});
