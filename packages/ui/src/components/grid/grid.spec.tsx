import { render } from '@testing-library/react';

import { Grid } from './grid.component.js';

import { GridContainer, GridItem } from './index.js';

describe('Grid', () => {
  it('renders the Grid component', () => {
    const { container } = render(<Grid />);
    expect(container).toBeInTheDocument();
  });

  it('renders the Container component', () => {
    const { container } = render(<GridContainer />);
    expect(container).toBeInTheDocument();
  });

  it('renders the Item component', () => {
    const { container } = render(<GridItem />);
    expect(container).toBeInTheDocument();
  });

  it('renders the Item style correctly', () => {
    const { container } = render(<GridItem span={2} />);
    expect(container.firstChild).toHaveClass('col-span-2');
  });
});
