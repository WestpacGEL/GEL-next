import { render } from '@testing-library/react';

import { Select } from './select.component.js';

describe('Select', () => {
  it('renders the component', () => {
    const { container } = render(<Select />);
    expect(container).toBeInTheDocument();
  });
});
