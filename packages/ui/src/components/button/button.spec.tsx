import { render } from '@testing-library/react';

import { Button } from './button.component.js';
import { styles } from './button.styles.js';

describe('Button', () => {
  it('renders the component', () => {
    const { container } = render(<Button tag="a" href="link" color="primary" />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ color: 'primary' });
    expect(style).toBe(
      'inline-flex items-center gap-2 rounded leading-[1.5] transition-colors disabled:pointer-events-none disabled:opacity-50 border border-primary bg-primary text-white hover:bg-primary-300 active:bg-primary-200',
    );
  });
});
