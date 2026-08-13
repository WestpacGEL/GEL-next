import { render, screen } from '@testing-library/react';

import { EnvelopeEmailPictogram } from './components/envelope-email-pictogram.js';
import { Pictogram } from './pictogram.component.js';
import { styles } from './pictogram.styles.js';
import { type PictogramMode } from './pictogram.types.js';

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

  it.each([
    ['default', '#F1423C'],
    ['inverse', '#DEDAD5'],
  ] as const)(
    'renders the %s variant for wbc26 and the standard duo variant for other brands',
    (mode, expectedFill) => {
      render(<EnvelopeEmailPictogram mode={mode} />);

      const pictogram = screen.getByRole('img');
      const [standard, wbc26] = pictogram.querySelectorAll(':scope > g');
      expect(standard).toHaveClass('wbc26:hidden');
      expect(standard.querySelector('path')).toHaveClass('fill-surface-pictogram-accent');
      expect(wbc26).toHaveClass('hidden', 'wbc26:inline');
      expect(wbc26.querySelector('path')).toHaveAttribute('fill', expectedFill);
    },
  );

  it.each(['base', 'mono', 'duo'] satisfies PictogramMode[])('hides the %s variant for wbc26', mode => {
    render(<EnvelopeEmailPictogram mode={mode} />);

    expect(screen.getByRole('img')).toHaveClass('wbc26:hidden');
  });
});
