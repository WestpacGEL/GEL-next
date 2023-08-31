import { render } from '@testing-library/react';

import { DatePicker } from './date-picker.component.js';
import { styles } from './date-picker.styles.js';
import { createDate, formatDate } from './date-picker.utils.js';

describe('DatePicker', () => {
  it('renders the component', () => {
    const { container } = render(<DatePicker />);
    expect(container).toBeInTheDocument();
  });

  it('renders the style correctly', () => {
    const style = styles({ size: 'lg' });
    // TODO: use some variants for test
    expect(style).toBe('date-picker date-picker-lg');
  });
  describe('DatePicker utils', () => {
    it('should format the date', () => {
      expect(formatDate(createDate('2023', '08', '01') ?? new Date(), 'DD/MM/YYYY')).toBe('01/08/2023');
    });
  });
});
