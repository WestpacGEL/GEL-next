import { render } from '@testing-library/react';

import { Badge } from './badge.component.js';
import { styles } from './badge.styles.js';

describe('Badge', () => {
  it('renders the component', () => {
    const { container } = render(<Badge />);
    expect(container).toBeInTheDocument();
  });
});
