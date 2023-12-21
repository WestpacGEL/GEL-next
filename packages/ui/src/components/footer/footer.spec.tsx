import { render } from '@testing-library/react';

import { BrandKey } from '../../tailwind/index.js';

import { Footer } from './footer.component.js';

describe('Footer', () => {
  it('renders the component', () => {
    const { container } = render(<Footer brand="wbc">Test</Footer>);
    expect(container).toBeInTheDocument();
  });

  it('should render correct brand logo', () => {
    const brandList: BrandKey[] = ['wbc', 'stg', 'bom', 'bsa', 'wbg', 'rams'];
    const brandNames = ['Westpac', 'St.George', 'Bank of Melbourne', 'Bank SA', 'Westpac Group', 'RAMS'];
    brandList.forEach((brand, index) => {
      const { container } = render(<Footer brand={brand}>Test</Footer>);
      expect(container.querySelector(`[aria-label="${brandNames[index]}"`)).toBeInTheDocument();
    });
  });
});
