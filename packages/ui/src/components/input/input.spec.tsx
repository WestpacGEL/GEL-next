import { render } from '@testing-library/react';

import { Input } from './input.component.js';
import { styles } from './input.styles.js';

describe('Input', () => {
  it('renders the component', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
