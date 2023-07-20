import { render } from '@testing-library/react';

import { Select } from './select.component.js';
import { styles } from './select.styles.js';

describe('Select', () => {
  it('renders the component', () => {
    const { container } = render(<Select />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
