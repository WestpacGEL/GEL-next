import { render } from '@testing-library/react';

import { CheckboxGroupCheckbox } from './checkbox-group-checkbox.component.js';
import { styles } from './checkbox-group-checkbox.styles.js';
import { CheckboxGroupCheckboxProps } from './checkbox-group-checkbox.types.js';

describe('Checkbox', () => {
  const defaultProps: CheckboxGroupCheckboxProps = {
    value: 'Option 1',
    label: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<CheckboxGroupCheckbox {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for Checkbox', () => {
    const { getByText } = render(<CheckboxGroupCheckbox {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable Checkbox if isDisabled is passed', () => {
    const { getByTestId } = render(
      <CheckboxGroupCheckbox {...defaultProps} isDisabled data-testid="disabled-checkbox-item" />,
    );
    expect(getByTestId('disabled-checkbox-item')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<CheckboxGroupCheckbox {...defaultProps} hint="test hint" />);
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
