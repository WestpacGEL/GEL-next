import { render } from '@testing-library/react';

import { SkipLink } from './skip-link.component.js';

describe('SkipLink', () => {
  it('renders the component', () => {
    const { container } = render(
      <SkipLink tag="a" href="#link">
        Only screen reader can read
      </SkipLink>,
    );
    expect(container).toBeInTheDocument();
  });
});
