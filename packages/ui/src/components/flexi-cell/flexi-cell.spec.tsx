import { render } from '@testing-library/react';

import { Badge } from '../badge/index.js';
import { InfoIcon } from '../icon/index.js';

import { FlexiCellAdornment } from './components/flexi-cell-adornment/flexi-cell-adornment.component.js';
import { FlexiCellButton } from './components/flexi-cell-button/flexi-cell-button.component.js';
import { FlexiCellCircle } from './components/flexi-cell-circle/flexi-cell-circle.component.js';
import { FlexiCellFooter } from './components/flexi-cell-footer/flexi-cell-footer.component.js';
import { FlexiCellHint } from './components/flexi-cell-hint/flexi-cell-hint.component.js';
import { FlexiCellLabel } from './components/flexi-cell-label/flexi-cell-label.component.js';
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
    expect(style.base()).toBe('relative flex bg-white transition-colors [&_:focus-visible]:focus-outline !px-0');
    expect(style.topBadge()).toBe('rounded-br-none rounded-tl-none');
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
      const { getByTestId } = render(
        <FlexiCell topBadge={() => <Badge data-testid="mock-badge">Flexi badge</Badge>} />,
      );

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

  describe('when dualAction is true', () => {
    test('body content should be a link', () => {
      const { getByRole } = render(
        <FlexiCell dualAction withBorder href="#test">
          <FlexiCellLabel>Test dual action</FlexiCellLabel>
        </FlexiCell>,
      );

      expect(getByRole('link', { name: 'Test dual action' })).toHaveAttribute('href', '#test');
    });
  });

  describe('when Flexicell Button is used', () => {
    test('should render button with icon', () => {
      const { getByTestId } = render(
        <FlexiCell
          after={
            <FlexiCellAdornment>
              <FlexiCellButton icon={() => <InfoIcon data-testid="icon" />} />
            </FlexiCellAdornment>
          }
        >
          <FlexiCellLabel>Test</FlexiCellLabel>
        </FlexiCell>,
      );

      expect(getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('when Flexicell Circle is used', () => {
    test('should render circle', () => {
      const { getByTestId } = render(
        <FlexiCell
          before={
            <FlexiCellAdornment>
              <FlexiCellCircle data-testid="circle">WW</FlexiCellCircle>
            </FlexiCellAdornment>
          }
        >
          <FlexiCellLabel>Test</FlexiCellLabel>
        </FlexiCell>,
      );

      expect(getByTestId('circle')).toBeInTheDocument();
    });
  });

  describe('when Flexicell Footer is used', () => {
    test('should render things inside footer', () => {
      const { getByTestId } = render(
        <FlexiCell>
          <FlexiCellLabel>Test</FlexiCellLabel>
          <FlexiCellFooter>
            <Badge data-testid="mock-badge">Flexi badge</Badge>
          </FlexiCellFooter>
        </FlexiCell>,
      );

      expect(getByTestId('mock-badge')).toBeInTheDocument();
    });
  });

  describe('when Flexicell Hint is used', () => {
    test('should render hint', () => {
      const { getByText } = render(
        <FlexiCell>
          <FlexiCellLabel>Test</FlexiCellLabel>
          <FlexiCellHint>Test hint</FlexiCellHint>
        </FlexiCell>,
      );

      expect(getByText('Test hint')).toBeInTheDocument();
    });
  });
});
