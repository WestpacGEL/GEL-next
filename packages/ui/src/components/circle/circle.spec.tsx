import { render } from '@testing-library/react';

import { Circle } from './circle.component.js';

describe('Circle', () => {
  it('renders the component', () => {
    const { container } = render(<Circle />);
    expect(container).toBeInTheDocument();
  });
});
