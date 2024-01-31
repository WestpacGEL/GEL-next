import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from './radio-group.component.js';

describe('RadioGroup', () => {
  it('renders the component', () => {
    const { container } = render(
      <RadioGroup
        label="test"
        radios={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render Radios when passed as children', () => {
    const { getByText } = render(
      <RadioGroup
        label="test"
        radios={[
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
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
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
          { value: 'Option 3', children: 'Option 3' },
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
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
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
          { value: 'Option 1', children: 'Option 1' },
          { value: 'Option 2', children: 'Option 2' },
        ]}
      />,
    );
    await act(() => user.click(getByRole('radio', { name: 'Option 1' })));
    expect(onChange).toBeCalled();
  });
});
