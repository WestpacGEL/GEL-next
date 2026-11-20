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

    it.each([
      [
        ['wbc', false],
        //  ['wbcLegacy', true],
        ['bom', true],
        ['bsa', true],
        ['btfg', true],
        ['stg', true],
        [undefined, true],
      ],
    ])(`renders ${name} with data-brand=%s: visible=%s`, (brand, visible) => {
      render(
        <div data-brand={brand}>
          <Pictogram />
        </div>,
      );

      const pictogram = screen.getByRole('img', { hidden: true });
      expect(pictogram).toBeInTheDocument();

      if (visible) {
        expect(pictogram).toBeVisible();
      } else {
        expect(pictogram).not.toBeVisible();
      }
    });
  });

  it('renders the style correctly', () => {
    const style = styles();
    expect(style).toBe('inline-block shrink-0 leading-none');
  });
});
