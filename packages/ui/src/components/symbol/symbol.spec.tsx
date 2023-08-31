import { render, screen } from '@testing-library/react';

import { Symbol } from './symbol.component.js';
import { styles } from './symbol.styles.js';
import { getTransform } from './symbol.utils.js';

import * as AllSymbols from './index.js';

describe('Symbol', () => {
  it('renders the component', () => {
    const { container } = render(<Symbol />);
    expect(container).toBeInTheDocument();
  });

  Object.entries(AllSymbols).forEach(([name, Symbol]) => {
    it(`renders the ${name} components`, () => {
      render(<Symbol />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  it('renders the style correctly', () => {
    const style = styles();
    expect(style).toBe('inline-block shrink-0 align-middle leading-none');
  });

  it('gets the correct align transform', () => {
    const transform = getTransform({ offset: [1, 2, 3], align: 'left' });
    expect(transform).toBe(`translate(1)`);
  });
});
