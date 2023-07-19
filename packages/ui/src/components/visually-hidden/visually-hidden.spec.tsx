import { render } from '@testing-library/react';

import { VisuallyHidden } from './visually-hidden.component.js';
import { styles } from './visually-hidden.styles.js';

describe('VisuallyHidden', () => {
  it('renders the component', () => {
    const { container } = render(<VisuallyHidden>Only screen reader can read this</VisuallyHidden>);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    expect(style).toBe('sr-only');
  });
});
