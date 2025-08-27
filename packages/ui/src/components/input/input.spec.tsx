import { render } from '@testing-library/react';

import { Input } from './input.component.js';

describe('Input', () => {
  it('renders the component', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
});
