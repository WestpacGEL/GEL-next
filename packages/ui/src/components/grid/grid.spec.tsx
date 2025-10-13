import { render } from '@testing-library/react';

import { styles as itemStyles } from './components/grid-item/grid-item.styles.js';
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
    const style = itemStyles({ span: 2 });
    expect(style).toBe('col-span-2');
  });
});
