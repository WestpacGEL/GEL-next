import { render } from '@testing-library/react';

import { Heading } from './heading.component.js';
import { styles } from './heading.styles.js';
import { HeadingProps } from './heading.types.js';

describe('Heading', () => {
  it('renders the component', () => {
    const { container } = render(<Heading size={1}>Heading</Heading>);
    expect(container).toBeInTheDocument();
  });

  it('should have the correct size', () => {
    const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    sizes.forEach((size: any) => {
      const { getByTestId } = render(
        <Heading data-testid={size} size={size}>
          Heading
        </Heading>,
      );
      expect(getByTestId(size)).toHaveClass(`typography-body-${size}`);
    });
  });

  it('should have the heading tag', () => {
    const headingLevels = [1, 2, 3, 4, 5, 6];
    headingLevels.forEach((level: any) => {
      const { getByRole } = render(
        <Heading tag={`h${level}` as keyof HeadingProps['tag']} size={1}>
          Heading
        </Heading>,
      );
      expect(getByRole('heading', { level: level })).toBeInTheDocument();
    });
  });
});
