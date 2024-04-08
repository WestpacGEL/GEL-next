import { render } from '@testing-library/react';

import { FlexiGroup } from './flexi-group.component.js';
import { styles } from './flexi-group.styles.js';

describe('FlexiGroup', () => {
  it('renders the component', () => {
    const { container } = render(<FlexiGroup />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
