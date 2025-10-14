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
      'whitespace-nowrap border text-center border-primary bg-primary text-white typography-body-10 flex min-w-4 w-fit items-center justify-center rounded-xl px-[0.4375rem] font-medium leading-none',
    );
  });
});
