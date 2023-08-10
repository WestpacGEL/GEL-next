import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonGroup } from './button-group.component.js';

describe('ButtonGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <ButtonGroup label="test">
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render buttons when passed as children', () => {
    const { getByText } = render(
      <ButtonGroup label="test">
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('should disable options when isDisabled prop passed', () => {
    const { getAllByRole } = render(
      <ButtonGroup label="test" isDisabled>
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
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

    const { getByTestId } = render(
      <ButtonGroup onChange={onChange} label="test">
        <ButtonGroup.Button value="Option 1" data-testid="option1">
          Option 1
        </ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(onChange).toBeCalled();
  });

  it('should have correct option be selected when clicked', async () => {
    const user = userEvent.setup();

    const { getByTestId } = render(
      <ButtonGroup label="test">
        <ButtonGroup.Button value="Option 1" data-testid="option1">
          Option 1
        </ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(getByTestId('option1')).toBeChecked();
  });
});
