import { render } from '@testing-library/react';

import { BrandKey } from '../../types/brand-types.js';

import { Header } from './header.component.js';

describe('Header', () => {
  it('renders the component', () => {
    const { container } = render(<Header brand="wbc" />);
    expect(container).toBeInTheDocument();
  });

  it('should render correct brand logo', () => {
    const brandList: Exclude<BrandKey, 'btfg'>[] = ['wbc', 'stg', 'bom', 'bsa'];
    const brandNames = ['Westpac', 'St.George', 'Bank of Melbourne', 'Bank SA', 'Westpac Group', 'RAMS'];
    brandList.forEach((brand, index) => {
      const { container } = render(<Header brand={brand} />);
      expect(container.querySelector(`[aria-label="${brandNames[index]}"`)).toBeInTheDocument();
    });
  });

  it('should render arrow icon when passed as left icon', () => {
    const { container } = render(<Header brand="wbc" leftIcon="arrow" />);
    expect(container.querySelector('[aria-label="Arrow Left"]')).toBeInTheDocument();
  });

  it('should have SkipLink when skipToContentId is passed', () => {
    const { getByText } = render(<Header brand="wbc" skipToContentId="#" />);
    expect(getByText('Skip to main content')).toBeInTheDocument();
  });

  it('should render children', () => {
    const { getByText } = render(<Header brand="wbc">Test</Header>);
    expect(getByText('Test')).toBeInTheDocument();
  });
});
