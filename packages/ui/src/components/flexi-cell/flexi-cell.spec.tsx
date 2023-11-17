import { render } from '@testing-library/react';

import { Badge } from '../badge/index.js';
import { InfoIcon } from '../icon/index.js';

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
    expect(style.base()).toBe(
      'relative flex bg-white transition-colors max-sm:mb-2 max-sm:gap-2 max-sm:p-2 sm:mb-3 sm:gap-3 sm:p-3',
    );
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
          <FlexiCell.Label>Test dual action</FlexiCell.Label>
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
            <FlexiCell.Adornment>
              <FlexiCell.Button icon={() => <InfoIcon data-testid="icon" />} />
            </FlexiCell.Adornment>
          }
        >
          <FlexiCell.Label>Test</FlexiCell.Label>
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
            <FlexiCell.Adornment>
              <FlexiCell.Circle data-testid="circle">WW</FlexiCell.Circle>
            </FlexiCell.Adornment>
          }
        >
          <FlexiCell.Label>Test</FlexiCell.Label>
        </FlexiCell>,
      );

      expect(getByTestId('circle')).toBeInTheDocument();
    });
  });

  describe('when Flexicell Footer is used', () => {
    test('should render things inside footer', () => {
      const { getByTestId } = render(
        <FlexiCell>
          <FlexiCell.Label>Test</FlexiCell.Label>
          <FlexiCell.Footer>
            <Badge data-testid="mock-badge">Flexi badge</Badge>
          </FlexiCell.Footer>
        </FlexiCell>,
      );

      expect(getByTestId('mock-badge')).toBeInTheDocument();
    });
  });

  describe('when Flexicell Hint is used', () => {
    test('should render hint', () => {
      const { getByText } = render(
        <FlexiCell>
          <FlexiCell.Label>Test</FlexiCell.Label>
          <FlexiCell.Hint>Test hint</FlexiCell.Hint>
        </FlexiCell>,
      );

      expect(getByText('Test hint')).toBeInTheDocument();
    });
  });
});
