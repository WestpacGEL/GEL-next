import { render } from '@testing-library/react';

import { InputField } from './input-field.component.js';
import { styles } from './input-field.styles.js';

describe('InputField', () => {
  it('renders the component', () => {
    const { container } = render(<InputField />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
