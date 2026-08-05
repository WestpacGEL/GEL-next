import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Flyout } from './flyout.component.js';

const WIDTH = '300px';

function ControlledFlyout() {
  const [open, setOpen] = useState(true);

  return <Flyout data-testid="flyout" onClose={() => setOpen(false)} open={open} width={WIDTH} />;
}

describe('Flyout', () => {
  it('does not render when closed', () => {
    render(
      <Flyout data-testid="flyout" onClose={vi.fn()} open={false} width={WIDTH}>
        Flyout content
      </Flyout>,
    );

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    expect(screen.queryByText('Flyout content')).not.toBeInTheDocument();
  });

  it('renders an open flyout at the supplied width using the right-aligned default', () => {
    render(<Flyout data-testid="flyout" onClose={vi.fn()} open width={WIDTH} />);

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toHaveStyle({ width: WIDTH });
    expect(flyout).toHaveClass('right-0', 'border-l', 'border-border-muted-soft');
  });

  it('positions an open flyout on the left side when requested', () => {
    render(<Flyout data-testid="flyout" onClose={vi.fn()} open position="left" width={WIDTH} />);

    expect(screen.getByTestId('flyout')).toHaveClass('left-0', 'border-r', 'border-border-muted-soft');
  });

  it('renders an optional heading as an h2 by default', () => {
    render(<Flyout heading="Flyout heading" onClose={vi.fn()} open width={WIDTH} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Flyout heading' })).toBeInTheDocument();
  });

  it('supports overriding the heading level', () => {
    render(<Flyout heading="Flyout heading" headingTag="h3" onClose={vi.fn()} open width={WIDTH} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Flyout heading' })).toBeInTheDocument();
  });

  it('does not render a heading when one is not supplied', () => {
    render(<Flyout onClose={vi.fn()} open width={WIDTH} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('closes through the consumer-owned state when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ControlledFlyout />);

    await act(() => user.click(screen.getByRole('button', { name: 'Close flyout' })));

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
  });

  it('supports custom assistive text for the close button', () => {
    render(<Flyout closeAssistiveText="Close application steps" onClose={vi.fn()} open width={WIDTH} />);

    expect(screen.getByRole('button', { name: 'Close application steps' })).toBeInTheDocument();
  });

  it('renders the specified root tag and forwards native attributes and styles', () => {
    render(
      <Flyout
        className="custom-class"
        data-testid="flyout"
        onClose={vi.fn()}
        open
        style={{ backgroundColor: 'red' }}
        tag="aside"
        title="Application steps"
        width="25rem"
      />,
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout.tagName).toBe('ASIDE');
    expect(flyout).toHaveAttribute('title', 'Application steps');
    expect(flyout).toHaveClass('custom-class');
    expect(flyout.style.backgroundColor).toBe('red');
    expect(flyout.style.width).toBe('25rem');
  });

  it('renders the header, close control and scrollable content with the specified structure', () => {
    render(
      <Flyout heading="Flyout heading" onClose={vi.fn()} open width={WIDTH}>
        Flyout content
      </Flyout>,
    );

    const heading = screen.getByRole('heading', { name: 'Flyout heading' });
    const header = heading.parentElement;
    const closeButton = screen.getByRole('button', { name: 'Close flyout' });
    const closeIcon = closeButton.querySelector('svg');
    const body = screen.getByText('Flyout content');

    expect(header).toHaveClass('h-9', 'items-center', 'justify-between', 'px-2');
    expect(heading).toHaveClass('typography-body-10', 'font-bold');
    expect(closeButton).toHaveClass('size-4', 'p-0');
    expect(closeIcon).toHaveClass('size-4', 'text-surface-primary');
    expect(body).toHaveClass('min-h-0', 'flex-1', 'overflow-auto');
  });
});
