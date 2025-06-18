import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Selector } from './selector.component.js';
import { type SelectorProps } from './selector.types.js';

import { SelectorButtonOption, SelectorCheckbox, SelectorLink, SelectorRadio } from './index.js';

const ariaDisabled = 'aria-disabled';
const ariaPressed = 'aria-pressed';
const handleClick = vi.fn();

const SimpleRadioSelector = (props: Omit<SelectorProps<'radio'>, 'children' | 'type'>) => (
  <Selector type="radio" aria-label="test" {...props}>
    <SelectorRadio value="1" data-testid="opt1">
      option 1
    </SelectorRadio>
    <SelectorRadio value="2" data-testid="opt2">
      option 2
    </SelectorRadio>
    <SelectorRadio value="3" data-testid="opt3">
      option 3
    </SelectorRadio>
  </Selector>
);

const SimpleCheckboxSelector = (props: Omit<SelectorProps<'checkbox'>, 'children' | 'type'>) => (
  <Selector type="checkbox" aria-label="test" {...props}>
    <SelectorCheckbox value="1" data-testid="opt1">
      option 1
    </SelectorCheckbox>
    <SelectorCheckbox value="2" data-testid="opt2">
      option 2
    </SelectorCheckbox>
    <SelectorCheckbox value="3" data-testid="opt3">
      option 3
    </SelectorCheckbox>
  </Selector>
);

const SimpleButtonSelector = (props: Omit<SelectorProps<'button'>, 'children' | 'type'>) => (
  <Selector type="button" aria-label="test" {...props}>
    <SelectorButtonOption id="A" data-testid="opt1" onClick={handleClick}>
      option 1
    </SelectorButtonOption>
    <SelectorButtonOption id="B" data-testid="opt2" onClick={handleClick}>
      option 2
    </SelectorButtonOption>
    <SelectorButtonOption id="C" data-testid="opt3" onClick={handleClick}>
      option 3
    </SelectorButtonOption>
  </Selector>
);

const SimpleLinkSelector = (props: Omit<SelectorProps<'link'>, 'children' | 'type'>) => (
  <Selector type="link" aria-label="test" {...props}>
    <SelectorLink href="#" data-testid="opt1">
      option 1
    </SelectorLink>
    <SelectorLink href="#" data-testid="opt2">
      option 2
    </SelectorLink>
    <SelectorLink href="#" data-testid="opt3">
      option 3
    </SelectorLink>
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

  it('should not be able to select a disabled option', async () => {
    const handleChange = vitest.fn(() => {
      return;
    });

    render(
      <Selector type="radio" aria-label="test" onChange={handleChange}>
        <SelectorRadio value="1" data-testid="opt1">
          option 1
        </SelectorRadio>
        <SelectorRadio value="2" data-testid="opt2">
          option 2
        </SelectorRadio>
        <SelectorRadio value="3" data-testid="opt3" isDisabled>
          option 3
        </SelectorRadio>
      </Selector>,
    );

    await act(async () => {
      await user.click(screen.getByText(/option 3/));
    });

    expect(handleChange).toBeCalledTimes(0);
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

  it('should render Simple Selector as button', () => {
    const { container } = render(<SimpleButtonSelector />);

    expect(container).toBeInTheDocument();
  });

  it('should render with correct defaultValue when defaultValue prop passed', () => {
    const { getByTestId } = render(<SimpleButtonSelector value="B" />);

    expect(getByTestId('opt1')).toHaveAttribute(ariaPressed, 'false');
    expect(getByTestId('opt2')).toHaveAttribute(ariaPressed, 'true');
    expect(getByTestId('opt3')).toHaveAttribute(ariaPressed, 'false');
  });

  it('should select correct option when clicked', async () => {
    const { getByTestId } = render(<SimpleButtonSelector />);
    const optionOne = getByTestId('opt1');
    const optionTwo = getByTestId('opt2');

    expect(optionOne).toHaveAttribute(ariaPressed, 'false');
    await act(async () => {
      await user.click(optionOne);
    });
    expect(optionOne).toHaveAttribute(ariaPressed, 'true');
    await act(async () => {
      await user.click(optionTwo);
    });
    expect(optionOne).toHaveAttribute(ariaPressed, 'false');
    expect(optionTwo).toHaveAttribute(ariaPressed, 'true');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('buttons should be disabled if disabled prop is passed', () => {
    const { getByTestId } = render(<SimpleButtonSelector isDisabled />);

    expect(getByTestId('opt1')).toHaveAttribute(ariaDisabled, 'true');
    expect(getByTestId('opt2')).toHaveAttribute(ariaDisabled, 'true');
    expect(getByTestId('opt3')).toHaveAttribute(ariaDisabled, 'true');
  });

  it('should render Simple Selector as link', () => {
    const { container } = render(<SimpleLinkSelector />);

    expect(container).toBeInTheDocument();
  });

  it('links should be disabled if disabled prop is passed', () => {
    const { getByTestId } = render(<SimpleLinkSelector isDisabled />);

    expect(getByTestId('opt1')).toHaveClass('pointer-events-none');
  });
});
