import { render } from '@testing-library/react';

import { Badge } from './badge.component.js';
import { styles } from './badge.styles.js';

describe('Badge', () => {
  it('renders the component', () => {
    const { container } = render(<Badge />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ color: 'primary', type: 'pill' });
    // TODO: use some variants for test
    expect(style).toBe(
      'whitespace-nowrap border text-center [&_:focus-visible]:focus-outline border-primary bg-primary text-white typography-body-10 inline-flex h-4 w-fit min-w-4 items-center justify-center rounded-xl px-[0.4375rem] font-medium leading-none',
    );
  });
});
