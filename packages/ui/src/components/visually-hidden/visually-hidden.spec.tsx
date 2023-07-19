import { render } from '@testing-library/react';

import { VisuallyHidden } from './visually-hidden.component.js';

describe('VisuallyHidden', () => {
  it('renders the component', () => {
    const { container } = render(<VisuallyHidden>Only screen reader can read this</VisuallyHidden>);
    expect(container).toBeInTheDocument();
  });
});
