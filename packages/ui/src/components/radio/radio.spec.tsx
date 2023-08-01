import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from './radio.component.js';

describe('Radio', () => {
  it('renders the component', () => {
    const { container } = render(<Radio label="test" />);
    expect(container).toBeInTheDocument();
  });

  it('should render Options when passed as children', () => {
    const { getByText } = render(
      <Radio label="test">
        <Radio.Option value="Option 1">Option 1</Radio.Option>
        <Radio.Option value="Option 2">Option 2</Radio.Option>
      </Radio>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should hide Options when showAmount prop is passed', async () => {
    const user = userEvent.setup();

    const { getByText } = render(
      <Radio showAmount={1} label="test">
        <Radio.Option value="Option 1">Option 1</Radio.Option>
        <Radio.Option value="Option 2">Option 2</Radio.Option>
        <Radio.Option value="Option 3">Option 3</Radio.Option>
      </Radio>,
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
      <Radio showAmount={1} label="test">
        <Radio.Option value="Option 1">Option 1</Radio.Option>
        <Radio.Option value="Option 2">Option 2</Radio.Option>
      </Radio>,
    );
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(getByText('Show 1 more item')).toBeInTheDocument();
  });

  it('should fire onChange when radio selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { getByTestId } = render(
      <Radio onChange={onChange} label="test">
        <Radio.Option value="Option 1" data-testid="option1">
          Option 1
        </Radio.Option>
        <Radio.Option value="Option 2">Option 2</Radio.Option>
      </Radio>,
    );
    await act(() => user.click(getByTestId('option1')));
    expect(onChange).toBeCalled();
  });

  it('should have Options be bigger when size large is passed', () => {
    const { container } = render(
      <Radio label="test" size="large">
        <Radio.Option value="Option 1">Option 1</Radio.Option>
        <Radio.Option value="Option 2">Option 2</Radio.Option>
      </Radio>,
    );

    expect(container.querySelector("[cx='15']")).toBeInTheDocument();
  });
});
