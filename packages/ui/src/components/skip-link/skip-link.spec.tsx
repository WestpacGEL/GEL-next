import { render } from '@testing-library/react';

import { SkipLink } from './skip-link.component.js';
import { styles } from './skip-link.styles.js';

describe('SkipLink', () => {
  it('renders the component', () => {
    const { container } = render(
      <SkipLink tag="a" href="#link">
        Only screen reader can read
      </SkipLink>,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    expect(style).toBe(
      'sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:bg-white focus:p-3 focus:text-center focus:text-xl focus:text-link focus:underline focus:-outline-offset-2',
    );
  });
});
