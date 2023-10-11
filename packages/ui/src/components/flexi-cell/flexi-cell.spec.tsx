import { render } from '@testing-library/react';

import { FlexiCell } from './flexi-cell.component.js';
import { styles } from './flexi-cell.styles.js';

describe('FlexiCell', () => {
  it('renders the component', () => {
    const { container } = render(<FlexiCell />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style.base()).toBe('relative flex gap-2 bg-white p-2 transition-colors xsl:p-3');
    expect(style.badge()).toBe('absolute right-0 top-0');
    expect(style.bodyWrapper()).toBe('flex flex-1 flex-col');
  });
  describe('when children is defined', () => {
    test('then the child component should be visible', () => {
      const { getByTestId } = render(
        <FlexiCell>
          <div data-testid="mock-child">Flexi child</div>
        </FlexiCell>,
      );

      expect(getByTestId('mock-child')).toBeVisible();
    });
  });

  describe('when a badge is defined', () => {
    test('then the badge should be visible', () => {
      const { getByTestId } = render(<FlexiCell badge={<div data-testid="mock-badge">Flexi badge</div>} />);

      expect(getByTestId('mock-badge')).toBeVisible();
    });
  });

  describe('when a before is defined', () => {
    test('then the before should be visible', () => {
      const { getByTestId } = render(<FlexiCell before={<div data-testid="mock-before">Flexi before</div>} />);

      expect(getByTestId('mock-before')).toBeVisible();
    });
  });

  describe('when an after is defined', () => {
    test('then the after should be visible', () => {
      const { getByTestId } = render(<FlexiCell after={<div data-testid="mock-after">Flexi after</div>} />);

      expect(getByTestId('mock-after')).toBeVisible();
    });
  });

  describe('when withArrow is true', () => {
    test('then an arrow should be visible', () => {
      const { getByRole } = render(<FlexiCell withArrow />);

      expect(getByRole('img', { hidden: true })).toBeVisible();
    });
  });
});
