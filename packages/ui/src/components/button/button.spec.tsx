import { render } from '@testing-library/react';

import { Button } from './button.component.js';

describe('Button', () => {
  it('renders the component', () => {
    const { container } = render(<Button tag="a" href="link" color="primary" />);
    expect(container).toBeInTheDocument();
  });
});
