import { render } from '@testing-library/react';

import { Popover } from './popover.component.js';
import { styles } from './popover.styles.js';

describe('Popover', () => {
  it('renders the component', () => {
    const { container } = render(<Popover>Test</Popover>);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
