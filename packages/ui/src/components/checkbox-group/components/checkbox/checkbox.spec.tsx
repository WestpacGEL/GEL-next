import { act, render } from '@testing-library/react';

import { Checkbox } from './checkbox.component.js';
import { CheckboxProps } from './checkbox.types.js';

describe('Checkbox', () => {
  const defaultProps: CheckboxProps = {
    value: 'Option 1',
    children: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for Checkbox', () => {
    const { getByText } = render(<Checkbox {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable Checkbox if isDisabled is passed', () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} isDisabled data-testid="disabled-checkbox-item" />);
    expect(getByTestId('disabled-checkbox-item')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<Checkbox {...defaultProps} hint="test hint" />);
    expect(getByText('test hint')).toBeInTheDocument();
  });

  it('should have correct styling on focus', () => {
    const { getByTestId, queryByTestId } = render(
      <Checkbox {...defaultProps} hint="test hint" data-testid="focused-checkbox-item" />,
    );
    expect(queryByTestId('focus-rect')).not.toBeInTheDocument();
    act(() => getByTestId('focused-checkbox-item').focus());
    expect(queryByTestId('focus-rect')).toBeInTheDocument();
  });
});
