import { render } from '@testing-library/react';

import { Icon } from './icon.component.js';

describe('Icon', () => {
  it('renders the component', () => {
    const { container } = render(<Icon />);
    expect(container).toBeInTheDocument();
  });
});
