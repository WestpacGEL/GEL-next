import { render } from '@testing-library/react';

import { styles as containerStyles } from './components/grid-container/grid-container.styles.js';
import { styles as itemStyles } from './components/grid-item/grid-item.styles.js';
import { Grid } from './grid.component.js';
import { styles as gridStyles } from './grid.styles.js';

import { GridContainer, GridItem } from './index.js';

describe('Grid', () => {
  it('renders the Grid component', () => {
    const { container } = render(<Grid />);
    expect(container).toBeInTheDocument();
  });

  it('renders the Grid style correctly', () => {
    const style = gridStyles();
    expect(style).toBe(
      'grid h-auto grid-flow-row auto-rows-[minmax(32px,auto)] grid-cols-[repeat(12,_1fr)] gap-2 xsl:gap-3 sm:gap-4',
    );
  });

  it('renders the Container component', () => {
    const { container } = render(<GridContainer />);
    expect(container).toBeInTheDocument();
  });

  it('renders the Container style correctly', () => {
    const style = containerStyles();
    expect(style).toBe('mx-auto box-border w-full');
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
