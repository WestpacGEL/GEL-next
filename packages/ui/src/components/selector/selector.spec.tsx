import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Selector } from './selector.component.js';
import { type SelectorProps } from './selector.types.js';

const SimpleRadioSelector = (props: Omit<SelectorProps<'radio'>, 'children' | 'type'>) => (
  <Selector type="radio" {...props}>
    <Selector.Radio value="1" data-testid="opt1">
      option 1
    </Selector.Radio>
    <Selector.Radio value="2" data-testid="opt2">
      option 2
    </Selector.Radio>
    <Selector.Radio value="3" data-testid="opt3">
      option 3
    </Selector.Radio>
  </Selector>
);

const SimpleCheckboxSelector = (props: Omit<SelectorProps<'checkbox'>, 'children' | 'type'>) => (
  <Selector type="checkbox" {...props}>
    <Selector.Checkbox value="1" data-testid="opt1">
      option 1
    </Selector.Checkbox>
    <Selector.Checkbox value="2" data-testid="opt2">
      option 2
    </Selector.Checkbox>
    <Selector.Checkbox value="3" data-testid="opt3">
      option 3
    </Selector.Checkbox>
  </Selector>
);

// Component specific tests
describe('Selector', () => {
  const user = userEvent.setup();

  it('should render Simple Selector as radio', () => {
    const { container } = render(<SimpleRadioSelector />);

    expect(container).toBeInTheDocument();
  });

  it('should render with correct defaultValue when defaultValue prop passed', () => {
    const { getByTestId } = render(<SimpleRadioSelector defaultValue="2" />);

    expect(getByTestId('opt1')).not.toBeChecked();
    expect(getByTestId('opt2')).toBeChecked();
    expect(getByTestId('opt3')).not.toBeChecked();
  });

  it('should render with correct defaultValue when value prop passed', () => {
    const { getByTestId } = render(<SimpleRadioSelector value="2" />);

    expect(getByTestId('opt1')).not.toBeChecked();
    expect(getByTestId('opt2')).toBeChecked();
    expect(getByTestId('opt3')).not.toBeChecked();
  });

  it('should select correct option when clicked', async () => {
    const { getByTestId } = render(<SimpleRadioSelector />);
    const optionOne = getByTestId('opt1');
    const optionTwo = getByTestId('opt2');

    expect(optionOne).not.toBeChecked();
    await act(async () => {
      await user.click(optionOne);
    });
    expect(optionOne).toBeChecked();
    await act(async () => {
      await user.click(optionTwo);
    });
    expect(optionOne).not.toBeChecked();
    expect(optionTwo).toBeChecked();
  });

  it('should options should be disabled if disabled prop is passed', () => {
    const { getByTestId } = render(<SimpleRadioSelector isDisabled />);

    expect(getByTestId('opt1')).toBeDisabled();
    expect(getByTestId('opt2')).toBeDisabled();
    expect(getByTestId('opt3')).toBeDisabled();
  });

  it('should call onChange function if type is button', async () => {
    const handleChange = vitest.fn(() => {
      return;
    });
    const { getByText } = render(<SimpleRadioSelector onChange={handleChange} />);

    await act(async () => {
      await user.click(getByText(/option 1/));
    });
    expect(handleChange).toBeCalledTimes(1);
  });

  it('should be able to select multiple options if type is checkbox', async () => {
    const { getByTestId } = render(<SimpleCheckboxSelector />);
    const optionOne = getByTestId('opt1');
    const optionTwo = getByTestId('opt2');
    const optionThree = getByTestId('opt3');

    expect(optionOne).not.toBeChecked();
    expect(optionTwo).not.toBeChecked();
    expect(optionThree).not.toBeChecked();
    await act(async () => {
      await user.click(optionOne);
      await user.click(optionTwo);
    });
    expect(optionOne).toBeChecked();
    expect(optionTwo).toBeChecked();
    expect(optionThree).not.toBeChecked();
  });

  it('should update selections correctly when unchecking a checked checkbox', async () => {
    const { getByTestId } = render(<SimpleCheckboxSelector defaultValue={['1', '2', '3']} />);
    const optionOne = getByTestId('opt1');
    const optionTwo = getByTestId('opt2');
    const optionThree = getByTestId('opt3');

    expect(optionOne).toBeChecked();
    expect(optionTwo).toBeChecked();
    expect(optionThree).toBeChecked();
    await act(async () => {
      await user.click(optionOne);
      await user.click(optionTwo);
    });
    expect(optionOne).not.toBeChecked();
    expect(optionTwo).not.toBeChecked();
    expect(optionThree).toBeChecked();
  });

  it('should call function passed in through onChange prop when option selected', async () => {
    const handleChange = vitest.fn(() => {
      return;
    });
    const { getByTestId } = render(<SimpleRadioSelector onChange={handleChange} />);
    await act(async () => {
      await user.click(getByTestId('opt1'));
    });
    expect(handleChange).toBeCalledTimes(1);
  });
});
