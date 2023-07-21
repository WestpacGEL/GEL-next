import { render } from '@testing-library/react';

import { Breadcrumb } from './breadcrumb.component.js';
import { styles } from './breadcrumb.styles.js';

describe('Breadcrumb', () => {
  it('renders the component', () => {
    const { container } = render(<Breadcrumb />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
