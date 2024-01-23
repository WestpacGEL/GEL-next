import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckboxGroup } from './checkbox-group.component.js';
import { CheckboxGroupCheckbox } from './components/checkbox-group-checkbox/checkbox-group-checkbox.component.js';

describe('CheckboxGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <CheckboxGroup label="test">
        <CheckboxGroupCheckbox value="Option 1">Option 1</CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 2</CheckboxGroupCheckbox>
      </CheckboxGroup>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render Options when passed as children', () => {
    const { getByText } = render(
      <CheckboxGroup label="test">
        <CheckboxGroupCheckbox value="Option 1">Option 1</CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 2</CheckboxGroupCheckbox>
      </CheckboxGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Options when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <CheckboxGroup showAmount={1} label="test">
        <CheckboxGroupCheckbox value="Option 1">Option 1</CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 2</CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 3">Option 3</CheckboxGroupCheckbox>
      </CheckboxGroup>,
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
      <CheckboxGroup showAmount={1} label="test">
        <CheckboxGroupCheckbox value="Option 1">Option 1</CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 2</CheckboxGroupCheckbox>
      </CheckboxGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when checkbox item selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <CheckboxGroup onChange={onChange} label="test">
        <CheckboxGroupCheckbox value="Option 1" data-testid="option1">
          Option 1
        </CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 2</CheckboxGroupCheckbox>
      </CheckboxGroup>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(onChange).toBeCalled();
  });

  it('should have multiple checkbox items checked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <CheckboxGroup onChange={onChange} label="test">
        <CheckboxGroupCheckbox value="Option 1" data-testid="option1">
          Option 1
        </CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2" data-testid="option2">
          Option 2
        </CheckboxGroupCheckbox>
        <CheckboxGroupCheckbox value="Option 2">Option 3</CheckboxGroupCheckbox>
      </CheckboxGroup>,
    );
    await act(() => user.click(getByTestId('option1')));
    await act(() => user.click(getByTestId('option2')));
    expect(getByTestId('option1')).toBeChecked();
    expect(getByTestId('option2')).toBeChecked();
  });
});
