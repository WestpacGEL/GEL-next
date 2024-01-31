import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonGroup } from './button-group.component.js';

describe('ButtonGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <ButtonGroup
        label="test"
        buttons={[
          {
            value: 'Option 1',
            children: 'Option 1',
          },
          {
            value: 'Option 2',
            children: 'Option 2',
          },
          {
            value: 'Option 3',
            children: 'Option 3',
          },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render buttons when passed as children', () => {
    const { getByText } = render(
      <ButtonGroup
        label="test"
        buttons={[
          {
            value: 'Option 1',
            children: 'Option 1',
          },
          {
            value: 'Option 2',
            children: 'Option 2',
          },
          {
            value: 'Option 3',
            children: 'Option 3',
          },
        ]}
      />,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('should disable options when isDisabled prop passed', () => {
    const { getAllByRole } = render(
      <ButtonGroup
        label="test"
        isDisabled
        buttons={[
          {
            value: 'Option 1',
            children: 'Option 1',
          },
          {
            value: 'Option 2',
            children: 'Option 2',
          },
          {
            value: 'Option 3',
            children: 'Option 3',
          },
        ]}
      />,
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
      <ButtonGroup
        onChange={onChange}
        label="test"
        buttons={[
          {
            value: 'Option 1',
            children: 'Option 1',
          },
          {
            value: 'Option 2',
            children: 'Option 2',
          },
          {
            value: 'Option 3',
            children: 'Option 3',
          },
        ]}
      />,
    );
    await act(() => user.click(getByText('Option 1')));
    expect(onChange).toBeCalled();
  });

  it('should have correct option be selected when clicked', async () => {
    const user = userEvent.setup();

    const { getByText, getByRole } = render(
      <ButtonGroup
        label="test"
        buttons={[
          {
            value: 'Option 1',
            children: 'Option 1',
          },
          {
            value: 'Option 2',
            children: 'Option 2',
          },
          {
            value: 'Option 3',
            children: 'Option 3',
          },
        ]}
      />,
    );
    await act(() => user.click(getByText('Option 1')));
    expect(getByRole('radio', { name: 'Option 1' })).toBeChecked();
  });
});
