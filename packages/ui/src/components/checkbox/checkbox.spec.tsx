import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './checkbox.component.js';

describe('Checkbox', () => {
  it('renders the component', () => {
    const { container } = render(<Checkbox label="test" />);
    expect(container).toBeInTheDocument();
  });

  it('should render Options when passed as children', () => {
    const { getByText } = render(
      <Checkbox label="test">
        <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>
      </Checkbox>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Options when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <Checkbox showAmount={1} label="test">
        <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>
      </Checkbox>,
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
      <Checkbox showAmount={1} label="test">
        <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>
      </Checkbox>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when checkbox item selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <Checkbox onChange={onChange} label="test">
        <Checkbox.CheckboxItem value="Option 1" data-testid="option1">
          Option 1
        </Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>
      </Checkbox>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(onChange).toBeCalled();
  });

  it('should have multiple checkbox items checked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <Checkbox onChange={onChange} label="test">
        <Checkbox.CheckboxItem value="Option 1" data-testid="option1">
          Option 1
        </Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2" data-testid="option2">
          Option 2
        </Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 3</Checkbox.CheckboxItem>
      </Checkbox>,
    );
    await act(() => user.click(getByTestId('option1')));
    await act(() => user.click(getByTestId('option2')));
    expect(getByTestId('option1')).toBeChecked();
    expect(getByTestId('option2')).toBeChecked();
  });

  it('should have Options be bigger when size large is passed', () => {
    const { container } = render(
      <Checkbox label="test" size="large">
        <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>
        <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>
      </Checkbox>,
    );
    expect(container.querySelector("[height='29']")).toBeInTheDocument();
  });
});
