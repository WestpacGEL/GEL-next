import { render } from '@testing-library/react';

import { Selector } from './selector.component.js';
import { styles } from './selector.styles.js';

describe('Selector', () => {
  it('renders the component', () => {
    const { container } = render(<Selector />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
