import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { FocusHandle } from '../../hook/focus-manager-ref.hook.js';

import { ButtonGroup } from './button-group.component.js';
import { ButtonGroupButton } from './components/button-group-button/button-group-button.component.js';

describe('ButtonGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <ButtonGroup>
        <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
        <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
      </ButtonGroup>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render buttons when passed as in buttons prop', () => {
    const { getByText } = render(
      <ButtonGroup>
        <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
        <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
      </ButtonGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('should disable options when isDisabled prop passed', () => {
    const { getAllByRole } = render(
      <ButtonGroup isDisabled>
        <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
        <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
      </ButtonGroup>,
    );
    const radios = getAllByRole('radio');
    expect(radios[0]).toBeDisabled();
    expect(radios[1]).toBeDisabled();
    expect(radios[2]).toBeDisabled();
  });

  it('should fire onChange when option selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByText } = render(
      <ButtonGroup onSelectionChange={onChange}>
        <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
        <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
      </ButtonGroup>,
    );
    await act(() => user.click(getByText('Option 1')));
    expect(onChange).toBeCalled();
  });

  it('should have correct option be selected when clicked', async () => {
    const user = userEvent.setup();

    const { getByText, getByRole } = render(
      <ButtonGroup>
        <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
        <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
      </ButtonGroup>,
    );
    await act(() => user.click(getByText('Option 1')));
    expect(getByRole('radio', { name: 'Option 1' })).toBeChecked();
  });

  describe('ref', () => {
    it('focus() skips disabled buttons and focuses the first enabled one', () => {
      const ref = createRef<FocusHandle>();
      const { getByRole } = render(
        <ButtonGroup ref={ref}>
          <ButtonGroupButton id="1" isDisabled>
            Option 1
          </ButtonGroupButton>
          <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
          <ButtonGroupButton id="3">Option 3</ButtonGroupButton>
        </ButtonGroup>,
      );
      act(() => ref.current?.focus());
      expect(getByRole('radio', { name: 'Option 2' })).toHaveFocus();
    });

    it('focus() resolves the target at call time, after options change', () => {
      const ref = createRef<FocusHandle>();
      const { getByRole, rerender } = render(
        <ButtonGroup ref={ref}>
          <ButtonGroupButton id="1">Option 1</ButtonGroupButton>
          <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        </ButtonGroup>,
      );
      rerender(
        <ButtonGroup ref={ref}>
          <ButtonGroupButton id="1" isDisabled>
            Option 1
          </ButtonGroupButton>
          <ButtonGroupButton id="2">Option 2</ButtonGroupButton>
        </ButtonGroup>,
      );
      act(() => ref.current?.focus());
      expect(getByRole('radio', { name: 'Option 2' })).toHaveFocus();
    });
  });
});
