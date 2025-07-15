import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './switch.component.js';

describe('Switch', () => {
  it('renders the component', () => {
    const { container } = render(<Switch label="test switch" />);
    expect(container).toBeInTheDocument();
  });

  it('should be checked when clicked', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(<Switch label="checked" />);
    await act(() => user.click(getByLabelText('checked')));
    expect(getByLabelText('checked')).toBeChecked();
  });

  it('should be disabled when isDisabled prop passed', () => {
    const { getByLabelText } = render(<Switch label="disabled" isDisabled />);
    expect(getByLabelText('disabled')).toBeDisabled();
  });

  it('should fire onChange when switch is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { getByLabelText } = render(<Switch label="onChange" onChange={onChange} />);
    await act(() => user.click(getByLabelText('onChange')));
    expect(onChange).toBeCalled();
  });
});
