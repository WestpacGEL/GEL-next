import { render, screen } from '@testing-library/react';

import { Pictogram } from './pictogram.component.js';
import { styles } from './pictogram.styles.js';

import * as AllPictograms from './index.js';

describe('Pictogram', () => {
  it('renders the component', () => {
    const { container } = render(<Pictogram />);
    expect(container).toBeInTheDocument();
  });

  Object.entries(AllPictograms).forEach(([name, Pictogram]) => {
    it(`renders the ${name} components`, () => {
      render(<Pictogram />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  it('renders the style correctly', () => {
    const style = styles();
    expect(style).toBe('inline-block shrink-0 leading-none');
  });
});
