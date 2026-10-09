import { act, render, screen } from '@testing-library/react';
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
