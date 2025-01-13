import { render, screen } from '@testing-library/react';

import { AndroidIcon } from '../icon/index.js';

import { List } from './list.component.js';

import { ListItem } from './index.js';

describe('List', () => {
  it('renders the component', () => {
    const { container } = render(
      <List>
        <ListItem>Styled bullet list</ListItem>
        <ListItem>Styled bullet list</ListItem>
        <ListItem>Styled bullet list</ListItem>
      </List>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render with correct bullet styles when type is bullet', () => {
    const { getByTestId } = render(
      <List type="bullet">
        <ListItem>bullet list</ListItem>
      </List>,
    );
    expect(getByTestId('bullet')).toHaveClass(
      'absolute block border border-hero bg-hero after:border-hero left-[0.25rem] top-1 size-[0.5rem] rounded-full',
    );
  });

  it('should render with correct bullet styles when type is link', () => {
    const { getByTestId } = render(
      <List type="link">
        <ListItem>link list</ListItem>
      </List>,
    );
    expect(getByTestId('link')).toHaveClass(
      'absolute block border border-link after:border-link left-[0.125rem] top-1 size-[0.5rem] rotate-45 border-b-0 border-l-0 border-r-[0.125rem] border-t-[0.125rem] bg-[transparent]',
    );
  });

  it('should render with correct bullet styles when type is tick', () => {
    const { getByTestId } = render(
      <List type="tick">
        <ListItem>tick list</ListItem>
      </List>,
    );
    expect(getByTestId('tick')).toHaveClass(
      'absolute block border border-hero after:border-hero left-[0.125rem] top-[0.3125rem] h-1 w-2 rotate-[-44deg] border-b-[0.125rem] border-l-[0.125rem] border-r-0 border-t-0 bg-[transparent]',
    );
  });

  it('should render with correct bullet styles when type is cross', () => {
    const { getByTestId } = render(
      <List type="cross">
        <ListItem>cross list</ListItem>
      </List>,
    );
    expect(getByTestId('cross')).toHaveClass(
      'absolute block border border-hero after:border-hero left-1 top-[0.25rem] h-2 w-0 -rotate-45 border-y-0 border-l-[0.125rem] border-r-0 bg-[transparent] after:absolute after:left-[-0.125rem] after:block after:h-2 after:w-0 after:rotate-90 after:border-y-0 after:border-l-[0.125rem] after:border-r-0',
    );
  });

  it('should render with correct bullet styles and icon when type is icon and icon provided', () => {
    const { getByTestId } = render(
      <List type="icon" icon={AndroidIcon}>
        <ListItem>icon list</ListItem>
      </List>,
    );
    expect(screen.getByRole('img', { name: 'Android' })).toBeInTheDocument();
    expect(getByTestId('icon')).toHaveClass('border-none bg-[transparent]');
  });

  it('should render with correct bullet styles when type is unstyled', () => {
    const { getByText } = render(
      <List type="unstyled">
        <ListItem>unstyled list</ListItem>
      </List>,
    );
    expect(getByText('unstyled list')).toHaveClass('pl-0');
  });

  it('should render with correct bullet styles when type is ordered', () => {
    const { getByText } = render(
      <List type="ordered">
        <ListItem>ordered list</ListItem>
      </List>,
    );
    expect(getByText('ordered list')).toHaveClass('pl-0');
  });

  it('should render with correct spacing when large spacing prop passed', () => {
    const { getByTestId } = render(
      <List type="bullet" spacing="large">
        <ListItem data-testid="large-item">bullet list</ListItem>
      </List>,
    );
    expect(getByTestId('large-item')).toHaveClass('my-2');
  });

  it('should render with correctly when nested', () => {
    const { getByTestId } = render(
      <List type="bullet">
        <ListItem>bullet list</ListItem>
        <List data-testid="nested-list">
          <ListItem>bullet list</ListItem>
        </List>
      </List>,
    );
    expect(getByTestId('nested-list')).toHaveClass('pl-4');
  });

  it('should apply aria-label when custom assistive text passed and tick', () => {
    const { getByLabelText } = render(
      <List type="tick" assistiveText="test assistive text">
        <ListItem>tick list</ListItem>
      </List>,
    );
    expect(getByLabelText('test assistive text')).toBeInTheDocument();
  });
});
