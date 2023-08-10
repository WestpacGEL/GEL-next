import { render } from '@testing-library/react';

import { Checkbox } from './checkbox.component.js';
import { styles } from './checkbox.styles.js';
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

  it('should have Radios be bigger when size is large', () => {
    const { checkbox } = styles({ size: 'large' });

    expect(checkbox()).toContain('h-5 w-5');
  });

  it('should have correct styling on focus', () => {
    const { checkbox } = styles({ isFocusVisible: true });

    expect(checkbox()).toContain('focus-outline');
  });
});
