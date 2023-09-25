import { render } from '@testing-library/react';

import { Pagination } from './pagination.component.js';
import { styles } from './pagination.styles.js';

describe('Pagination', () => {
  it('renders the component as link', () => {
    const { container } = render(
      <Pagination
        current={1}
        pages={[
          { href: '#page1', text: 'page-1' },
          { href: '#page2', text: 'page-2' },
          { href: '#page3', text: 'page-3' },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the component as data driven', () => {
    const fn = vitest.fn();
    const { container } = render(
      <Pagination current={1} onChange={fn} pages={[{ text: 'page-1' }, { text: 'page-2' }, { text: 'page-3' }]} />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const { base, ul } = styles();
    // TODO: use some variants for test
    expect(base()).toBe('overflow-hidden rounded border border-border');
    expect(ul()).toBe('flex');
  });
});
