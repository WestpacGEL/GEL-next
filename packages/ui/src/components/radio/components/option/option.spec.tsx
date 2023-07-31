import { act, render } from '@testing-library/react';

import { Option } from './option.component.js';
import { OptionProps } from './option.types.js';

describe('Option', () => {
  const defaultProps: OptionProps = {
    value: 'Option 1',
    children: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<Option {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for Option', () => {
    const { getByText } = render(<Option {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable Option if isDisabled is passed', () => {
    const { getByTestId } = render(<Option {...defaultProps} isDisabled data-testid="disabled-option" />);
    expect(getByTestId('disabled-option')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<Option {...defaultProps} hint="test hint" />);
    expect(getByText('test hint')).toBeInTheDocument();
  });

  it('should have correct styling on focus', () => {
    const { getByTestId, queryByTestId } = render(
      <Option {...defaultProps} hint="test hint" data-testid="focused-option" />,
    );
    expect(queryByTestId('focus-ring')).not.toBeInTheDocument();
    act(() => getByTestId('focused-option').focus());
    expect(queryByTestId('focus-ring')).toBeInTheDocument();
  });
});
