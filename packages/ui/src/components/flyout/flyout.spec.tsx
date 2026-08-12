import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOverlayTriggerState } from 'react-stately';

import { Flyout } from './flyout.component.js';
import { type FlyoutProps } from './flyout.types.js';

type TestFlyoutProps = Omit<FlyoutProps, 'state'> & { defaultOpen?: boolean };

function TestFlyout({ defaultOpen = true, ...props }: TestFlyoutProps) {
  const state = useOverlayTriggerState({ defaultOpen });

  return <Flyout aria-label="Flyout" data-testid="flyout" {...props} state={state} />;
}

function TriggeredFlyout() {
  const state = useOverlayTriggerState({});

  return (
    <>
      <button onClick={() => state.open()}>Open flyout</button>
      <Flyout aria-label="Flyout" data-testid="flyout" state={state} />
    </>
  );
}

describe('Flyout', () => {
  const user = userEvent.setup();

  it('does not render when initially closed', () => {
    render(<TestFlyout defaultOpen={false}>Flyout content</TestFlyout>);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    expect(screen.queryByText('Flyout content')).not.toBeInTheDocument();
  });

  it('renders an open flyout using the right-aligned default', () => {
    render(<TestFlyout />);

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toHaveClass('right-0', 'translate-x-0', 'border-l', 'border-border-muted-soft');
    expect(flyout).not.toHaveAttribute('aria-hidden');
    expect(flyout).not.toHaveAttribute('inert');
    expect(flyout.parentElement).toHaveClass('bg-black/65');
  });

  it('positions an open left-aligned flyout on the left side', () => {
    render(<TestFlyout position="left" />);

    expect(screen.getByTestId('flyout')).toHaveClass('left-0', 'translate-x-0', 'border-r', 'border-border-muted-soft');
  });

  it('renders an optional heading as an h2 and labels the dialog', () => {
    render(<TestFlyout aria-label={undefined} heading="Flyout heading" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Flyout heading' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Flyout heading' })).toBeInTheDocument();
  });

  it('supports overriding the heading level', () => {
    render(<TestFlyout heading="Flyout heading" headingTag="h3" />);

    expect(screen.getByRole('heading', { level: 3, name: 'Flyout heading' })).toBeInTheDocument();
  });

  it('does not render a heading when one is not supplied', () => {
    render(<TestFlyout />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it.each([
    ['right', 'translate-x-full'],
    ['left', '-translate-x-full'],
  ] as const)('unmounts a %s-aligned flyout after the closing transition finishes', async (position, closedClass) => {
    render(<TestFlyout position={position} />);
    const flyout = screen.getByTestId('flyout');
    let finishTransition: () => void;
    const transitionFinished = new Promise<void>(resolve => {
      finishTransition = resolve;
    });
    Object.defineProperty(flyout, 'getAnimations', {
      value: () => [{ finished: transitionFinished }],
    });

    await act(() => user.click(screen.getByRole('button', { name: 'Close flyout' })));

    expect(flyout).toBeInTheDocument();
    expect(flyout).toHaveClass(closedClass);
    expect(flyout).toHaveAttribute('aria-hidden', 'true');
    expect(flyout.firstElementChild).toHaveClass('hidden');
    expect(flyout.parentElement).not.toHaveClass('bg-black/65');

    await act(() => {
      finishTransition();
      return transitionFinished;
    });

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
  });

  it('moves focus into the flyout and restores it to the trigger after the closing transition', async () => {
    render(<TriggeredFlyout />);
    const trigger = screen.getByRole('button', { name: 'Open flyout' });

    await act(() => user.click(trigger));
    const flyout = screen.getByRole('dialog', { name: 'Flyout' });
    expect(flyout).toHaveFocus();

    let finishTransition: () => void;
    const transitionFinished = new Promise<void>(resolve => {
      finishTransition = resolve;
    });
    Object.defineProperty(flyout, 'getAnimations', {
      value: () => [{ finished: transitionFinished }],
    });

    await act(() => user.click(screen.getByRole('button', { name: 'Close flyout' })));
    expect(flyout).toBeInTheDocument();
    expect(trigger).not.toHaveFocus();

    await act(() => {
      finishTransition();
      return transitionFinished;
    });

    expect(flyout).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes when the backdrop is clicked', () => {
    render(<TestFlyout />);
    const flyout = screen.getByTestId('flyout');
    const backdrop = flyout.parentElement;
    expect(backdrop).not.toBeNull();

    fireEvent.mouseDown(backdrop as HTMLElement);
    fireEvent.mouseUp(backdrop as HTMLElement);

    expect(flyout).toHaveClass('translate-x-full');
  });

  it('does not close when the flyout content is clicked', async () => {
    render(<TestFlyout>Flyout content</TestFlyout>);

    await act(() => user.click(screen.getByText('Flyout content')));

    expect(screen.getByTestId('flyout')).toHaveClass('translate-x-0');
  });

  it('closes when Escape is pressed', async () => {
    render(<TestFlyout />);
    const flyout = screen.getByTestId('flyout');

    await act(() => user.keyboard('{Escape}'));

    expect(flyout).toHaveClass('translate-x-full');
  });

  it('supports custom assistive text for the close button', () => {
    render(<TestFlyout closeAssistiveText="Close application steps" />);

    expect(screen.getByRole('button', { name: 'Close application steps' })).toBeInTheDocument();
  });

  it('does not render a close button when the flyout is not dismissable', () => {
    render(<TestFlyout isDismissable={false} />);

    expect(screen.queryByRole('button', { name: 'Close flyout' })).not.toBeInTheDocument();
  });

  it('renders a div and forwards native attributes and styles', () => {
    render(
      <TestFlyout
        // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
        className="custom-class"
        data-testid="flyout"
        style={{ backgroundColor: 'red' }}
        title="Application steps"
      />,
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout.tagName).toBe('DIV');
    expect(flyout).toHaveAttribute('title', 'Application steps');
    expect(flyout).toHaveClass('custom-class');
    expect(flyout.style.backgroundColor).toBe('red');
  });

  it('renders the header, close control and scrollable content with the specified structure', () => {
    render(<TestFlyout heading="Flyout heading">Flyout content</TestFlyout>);

    const heading = screen.getByRole('heading', { name: 'Flyout heading' });
    const header = heading.parentElement;
    const closeButton = screen.getByRole('button', { name: 'Close flyout' });
    const closeIcon = closeButton.querySelector('svg');
    const body = screen.getByText('Flyout content');

    expect(header).toHaveClass('h-9', 'items-center', 'pl-2');
    expect(heading).toHaveClass('typography-body-10', 'font-bold');
    expect(closeButton).toHaveClass('ml-auto', 'h-6', 'shrink-0', 'px-2');
    expect(closeIcon).toHaveClass('size-4', 'text-surface-primary');
    expect(body).toHaveClass('min-h-0', 'flex-1', 'overflow-auto');
  });
});
