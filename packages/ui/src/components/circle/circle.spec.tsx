import { render } from '@testing-library/react';

import { Circle } from './circle.component.js';
import { styles } from './circle.styles.js';

describe('Circle', () => {
  it('renders the component', () => {
    const { container } = render(<Circle />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('flex h-5 w-5 flex-col items-center justify-center overflow-hidden rounded-full bg-background');
  });
});
