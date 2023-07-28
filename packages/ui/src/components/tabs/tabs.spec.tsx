import { render } from '@testing-library/react';

import { Tabs } from './tabs.component.js';
import { styles } from './tabs.styles.js';

describe('Tabs', () => {
  it('renders the component', () => {
    const { container } = render(<Tabs />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
