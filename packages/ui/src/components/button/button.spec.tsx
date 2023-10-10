import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';

import { Button } from './button.component.js';
import { styles } from './button.styles.js';
import { getIconSize } from './button.utils.js';

describe('Button', () => {
  const user = userEvent.setup();
  it('renders the component', () => {
    const { container } = render(<Button tag="a" href="link" look="primary" />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ look: 'primary', size: 'medium' });
    expect(style.base()).toBe(
      'inline-flex items-center justify-center rounded leading-[1.5] transition-[background] disabled:pointer-events-none disabled:opacity-50 group-[.add-on-after]:rounded-l-none group-[.add-on-before]:rounded-r-none typography-body-9 px-2 py-[0.3125rem] on-theme-rams:before:h-[0.125rem] relative border border-primary bg-primary text-white hover:bg-primary-70 active:bg-primary-50 on-theme-rams:border-b-pop on-theme-rams:before:absolute on-theme-rams:before:bottom-0 on-theme-rams:before:block on-theme-rams:before:w-full on-theme-rams:before:bg-pop',
    );
  });

  it('renders an iconBefore when passed', () => {
    render(<Button iconBefore={ArrowRightIcon} />);
    expect(screen.getByRole('img', { name: 'Arrow Right' })).toBeInTheDocument();
  });

  it('renders an iconAfter when passed', () => {
    render(<Button iconAfter={ArrowLeftIcon} />);
    expect(screen.getByRole('img', { name: 'Arrow Left' })).toBeInTheDocument();
  });

  it('renders as an a tag', () => {
    render(
      <Button tag="a" href="#">
        Link
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('calls the onClick', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Button Click</Button>);
    await act(() => {
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
    expect(size).toStrictEqual({ initial: 'small', md: 'medium', lg: 'medium' });
  });
});
