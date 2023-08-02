import { act, render } from '@testing-library/react';

import { CheckboxItem } from './checkbox-item.component.js';
import { styles } from './checkbox-item.styles.js';
import { CheckboxItemProps } from './checkbox-item.types.js';

describe('CheckboxItem', () => {
  const defaultProps: CheckboxItemProps = {
    value: 'Option 1',
    children: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<CheckboxItem {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for CheckboxItem', () => {
    const { getByText } = render(<CheckboxItem {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable CheckboxItem if isDisabled is passed', () => {
    const { getByTestId } = render(<CheckboxItem {...defaultProps} isDisabled data-testid="disabled-checkbox-item" />);
    expect(getByTestId('disabled-checkbox-item')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<CheckboxItem {...defaultProps} hint="test hint" />);
    expect(getByText('test hint')).toBeInTheDocument();
  });

  it('should have correct styling on focus', () => {
    const { getByTestId, queryByTestId } = render(
      <CheckboxItem {...defaultProps} hint="test hint" data-testid="focused-checkbox-item" />,
    );
    expect(queryByTestId('focus-rect')).not.toBeInTheDocument();
    act(() => getByTestId('focused-checkbox-item').focus());
    expect(queryByTestId('focus-rect')).toBeInTheDocument();
  });
});
