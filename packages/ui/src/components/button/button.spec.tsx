import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, forwardRef, type ReactNode } from 'react';
import { vi } from 'vitest';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';

import { Button } from './button.component.js';
import { getIconSize } from './button.utils.js';

const CustomLink = forwardRef<HTMLAnchorElement, { children?: ReactNode; className?: string; to: string }>(
  ({ to, ...props }, ref) => <a ref={ref} href={to} {...props} />,
);

describe('Button', () => {
  const user = userEvent.setup();
  it('renders the component', () => {
    const { container } = render(<Button tag="a" href="link" look="primary" />);
    expect(container).toBeInTheDocument();
  });

  it('renders an iconBefore when passed', () => {
    render(<Button iconBefore={ArrowRightIcon} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders an iconAfter when passed', () => {
    render(<Button iconAfter={ArrowLeftIcon} />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders as an a tag', () => {
    render(
      <Button tag="a" href="#">
        Link
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('renders as a custom component with its props and ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button tag={CustomLink} ref={ref} to="/custom-link">
        Custom link
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Custom link' })).toHaveAttribute('href', '/custom-link');
    expect(ref.current).toBe(screen.getByRole('link', { name: 'Custom link' }));
  });

  it('defaults a native button to type button', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button', { name: 'Button' })).toHaveAttribute('type', 'button');
  });

  it('calls the onClick', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Button Click</Button>);
    act(() => {
      user.click(screen.getByRole('button', { name: 'Button Click' }));
    });
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Button utils', () => {
  it('maps the correct icon size for a given button size', () => {
    const size = getIconSize('medium');
    expect(size).toBe('small');
  });

  it('maps the correct responsive icon sizes for responsive button sizing', () => {
    const size = getIconSize({
      initial: 'small',
      md: 'large',
      lg: 'xlarge',
    });
    expect(size).toStrictEqual({ initial: 'xsmall', md: 'small', lg: 'medium' });
  });
});
