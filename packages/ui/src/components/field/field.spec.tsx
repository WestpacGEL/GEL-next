import { render } from '@testing-library/react';

import { Field } from './field.component.js';

describe('Field', () => {
  it('renders the component', () => {
    const { container } = render(<Field aria-label="test" />);
    expect(container).toBeInTheDocument();
  });
});
