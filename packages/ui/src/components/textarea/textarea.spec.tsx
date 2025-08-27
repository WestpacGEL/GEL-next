import { render } from '@testing-library/react';

import { Textarea } from './textarea.component.js';

describe('Textarea', () => {
  it('renders the component', () => {
    const { container } = render(<Textarea />);
    expect(container).toBeInTheDocument();
  });
});
