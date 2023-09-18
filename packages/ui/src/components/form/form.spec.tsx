import { render } from '@testing-library/react';

import { Form } from './form.component.js';
import { styles } from './form.styles.js';

describe('Form', () => {
  it('renders the component', () => {
    const { container } = render(<Form />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
