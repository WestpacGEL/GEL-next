import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { FocusHandle } from '../../hook/focus-manager-ref.hook.js';

import { RadioGroup } from './radio-group.component.js';

describe('RadioGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <RadioGroup
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('announces only visible errors in a persistent region when opted in', async () => {
    const radios = [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
    ];
    const renderGroup = (isInvalid: boolean, errorMessage?: string | string[], announceError?: boolean) => (
      <RadioGroup
        label="Contact preference"
        hintMessage="Choose how we contact you"
        radios={radios}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        announceError={announceError}
      />
    );
    const { container, rerender } = render(renderGroup(true, 'Choose a contact preference'));
    expect(screen.getByText('Choose a contact preference')).toBeVisible();
    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument();

    // A supplied message must stay hidden while the group is valid.
    rerender(renderGroup(false, 'Choose a contact preference', true));
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeEmptyDOMElement();
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    expect(screen.queryByText('Choose a contact preference')).not.toBeInTheDocument();

    rerender(renderGroup(true, 'Choose a contact preference', true));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(screen.getAllByText('Choose a contact preference')).toHaveLength(1);
    expect(screen.getByText('Choose a contact preference')).toBeVisible();
    expect(liveRegion).toContainElement(screen.getByText('Choose a contact preference'));
    expect(liveRegion).not.toContainElement(screen.getByText('Contact preference'));
    expect(liveRegion).not.toContainElement(screen.getByText('Choose how we contact you'));
    expect(liveRegion).not.toContainElement(screen.getByRole('radio', { name: 'Email' }));
    expect(liveRegion).not.toContainElement(screen.getByRole('radio', { name: 'Phone' }));
    await waitFor(() =>
      expect(screen.getByRole('radiogroup', { name: 'Contact preference' })).toHaveAccessibleDescription(
        'Choose how we contact you Choose a contact preference',
      ),
    );

    rerender(renderGroup(true, ['Choose email or phone', 'Confirm your preference'], true));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(screen.queryByText('Choose a contact preference')).not.toBeInTheDocument();
    const list = screen.getByRole('list');
    expect(liveRegion).toContainElement(list);
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(list).getByText('Choose email or phone')).toBeVisible();
    expect(within(list).getByText('Confirm your preference')).toBeVisible();

    // Clearing invalidity must clear the announcement even when a message remains supplied.
    rerender(renderGroup(false, 'Choose a contact preference', true));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(liveRegion).toBeEmptyDOMElement();
    await waitFor(() =>
      expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription('Choose how we contact you'),
    );

    rerender(renderGroup(true, undefined, true));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(liveRegion).toBeEmptyDOMElement();
  });

  it('should render Radios when passed in through radios prop', () => {
    const { getByText } = render(
      <RadioGroup
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Radios when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <RadioGroup
        showAmount={1}
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
          { value: 'Option 3', label: 'Option 3' },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    expect(getByText('Show 2 more items')).toBeInTheDocument();
    await act(() => user.click(getByText('Show 2 more items')));
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('should display correct text on button showAmount prop is passed and there is only one hidden', () => {
    const { getByText } = render(
      <RadioGroup
        showAmount={1}
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when radio selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <RadioGroup
        onChange={onChange}
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    await act(() => user.click(getByRole('radio', { name: 'Option 1' })));
    expect(onChange).toBeCalled();
  });

  describe('ref', () => {
    const radios = [
      { value: 'Option 1', label: 'Option 1', isDisabled: true },
      { value: 'Option 2', label: 'Option 2' },
      { value: 'Option 3', label: 'Option 3' },
    ];

    it('focus() skips disabled radios and focuses the first enabled one', () => {
      const ref = createRef<FocusHandle>();
      render(<RadioGroup ref={ref} label="test" radios={radios} />);
      act(() => ref.current?.focus());
      expect(screen.getByRole('radio', { name: 'Option 2' })).toHaveFocus();
    });

    it('focus() targets the selected radio (the group tab stop), not the first', () => {
      const ref = createRef<FocusHandle>();
      render(<RadioGroup ref={ref} label="test" radios={radios} defaultValue="Option 3" />);
      act(() => ref.current?.focus());
      expect(screen.getByRole('radio', { name: 'Option 3' })).toHaveFocus();
    });

    it('focus() only ever lands on a radio, even when none is tabbable and "show more" is rendered', () => {
      // react-hook-form forms commonly default to ''; react-aria then gives every radio tabindex=-1, which
      // would otherwise make the "Show more" button the first tabbable element inside the group.
      const ref = createRef<FocusHandle>();
      render(<RadioGroup ref={ref} label="test" radios={radios} value="" showAmount={2} />);
      expect(screen.getByRole('radio', { name: 'Option 2' })).toHaveAttribute('tabindex', '-1');
      act(() => ref.current?.focus());
      expect(screen.getByRole('radio', { name: 'Option 2' })).toHaveFocus();
    });
  });

  it('moves focus to the first revealed radio after "show more"', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup
        showAmount={1}
        label="test"
        radios={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    await act(() => user.click(screen.getByText('Show 1 more item')));
    expect(screen.getByRole('radio', { name: 'Option 2' })).toHaveFocus();
  });
});
