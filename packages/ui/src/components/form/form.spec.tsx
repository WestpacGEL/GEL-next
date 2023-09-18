import { render } from '@testing-library/react';

import { Form } from './form.component.js';

describe('Form', () => {
  it('renders the component', () => {
    const { container } = render(<Form />);
    expect(container).toBeInTheDocument();
  });
});
