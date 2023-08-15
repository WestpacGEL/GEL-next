import { render } from '@testing-library/react';

import { Popover } from './popover.component.js';

describe('Popover', () => {
  it('renders the component', () => {
    const { container } = render(<Popover>Test</Popover>);
    expect(container).toBeInTheDocument();
  });
});
