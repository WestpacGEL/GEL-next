import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from './radio-group.component.js';

describe('RadioGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <RadioGroup label="test">
        <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
      </RadioGroup>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render Radios when passed as children', () => {
    const { getByText } = render(
      <RadioGroup label="test">
        <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
      </RadioGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Radios when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <RadioGroup showAmount={1} label="test">
        <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>
      </RadioGroup>,
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
      <RadioGroup showAmount={1} label="test">
        <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
      </RadioGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when radio selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <RadioGroup onChange={onChange} label="test">
        <RadioGroup.Radio value="Option 1" data-testid="option1">
          Option 1
        </RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
      </RadioGroup>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(onChange).toBeCalled();
  });

  it('should have Radios be bigger when size large is passed', () => {
    const { container } = render(
      <RadioGroup label="test" size="large">
        <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>
        <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>
      </RadioGroup>,
    );

    expect(container.querySelector("[cx='15']")).toBeInTheDocument();
  });
});
