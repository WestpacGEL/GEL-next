import { render } from '@testing-library/react';

import { Circle } from './circle.component.js';
import { styles } from './circle.styles.js';

describe('Circle', () => {
  it('renders the component', () => {
    const { container } = render(<Circle />);
    expect(container).toBeInTheDocument();
  });
});
