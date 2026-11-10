import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { FocusHandle } from '../../hook/focus-manager-ref.hook.js';

import { CheckboxGroup } from './checkbox-group.component.js';

describe('CheckboxGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <CheckboxGroup
        label="test"
        checkboxes={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render Options when passed in through checkboxes prop', () => {
    const { getByText } = render(
      <CheckboxGroup
        label="test"
        checkboxes={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Options when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <CheckboxGroup
        showAmount={1}
        label="test"
        checkboxes={[
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
      <CheckboxGroup
        showAmount={1}
        label="test"
        checkboxes={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when checkbox item selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole } = render(
      <CheckboxGroup
        onChange={onChange}
        label="test"
        checkboxes={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
        ]}
      />,
    );
    await act(() => user.click(getByRole('checkbox', { name: 'Option 1' })));
    expect(onChange).toBeCalled();
  });

  it('should have multiple checkbox items checked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByRole, getAllByRole } = render(
      <CheckboxGroup
        onChange={onChange}
        label="test"
        checkboxes={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
          { value: 'Option 3', label: 'Option 3' },
        ]}
      />,
    );
    await act(() => user.click(getByRole('checkbox', { name: 'Option 1' })));
    await act(() => user.click(getByRole('checkbox', { name: 'Option 2' })));
    expect(getAllByRole('checkbox', { checked: true }).length).toBe(2);
  });

  describe('ref', () => {
    it('focus() skips disabled checkboxes and focuses the first enabled one', () => {
      const ref = createRef<FocusHandle>();
      render(
        <CheckboxGroup
          ref={ref}
          label="test"
          checkboxes={[
            { value: 'Option 1', label: 'Option 1', isDisabled: true },
            { value: 'Option 2', label: 'Option 2' },
          ]}
        />,
      );
      act(() => ref.current?.focus());
      expect(screen.getByRole('checkbox', { name: 'Option 2' })).toHaveFocus();
    });

    it('focus() works when checkboxes are added after mount', () => {
      const ref = createRef<FocusHandle>();
      const { rerender } = render(<CheckboxGroup ref={ref} label="test" checkboxes={[]} />);
      rerender(<CheckboxGroup ref={ref} label="test" checkboxes={[{ value: 'Option 1', label: 'Option 1' }]} />);
      act(() => ref.current?.focus());
      expect(screen.getByRole('checkbox', { name: 'Option 1' })).toHaveFocus();
    });

    it('show more moves focus to the first revealed checkbox', async () => {
      const user = userEvent.setup();
      render(
        <CheckboxGroup
          showAmount={1}
          label="test"
          checkboxes={[
            { value: 'Option 1', label: 'Option 1' },
            { value: 'Option 2', label: 'Option 2' },
            { value: 'Option 3', label: 'Option 3' },
          ]}
        />,
      );
      await act(() => user.click(screen.getByText('Show 2 more items')));
      expect(screen.getByRole('checkbox', { name: 'Option 2' })).toHaveFocus();
    });
  });
});
