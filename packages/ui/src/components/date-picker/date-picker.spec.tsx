import { render } from '@testing-library/react';

import { DatePicker } from './date-picker.component.js';
import { styles } from './date-picker.styles.js';

describe('DatePicker', () => {
  it('renders the component', () => {
    const { container } = render(<DatePicker />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
