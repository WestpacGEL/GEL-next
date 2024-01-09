import { render } from '@testing-library/react';

import { RadioGroupRadio } from './radio-group-radio.component.js';
import { styles } from './radio-group-radio.styles.js';
import { RadioGroupRadioProps } from './radio-group-radio.types.js';

describe('Radio', () => {
  const defaultProps: RadioGroupRadioProps = {
    value: 'Option 1',
    children: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<RadioGroupRadio {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for Radio', () => {
    const { getByText } = render(<RadioGroupRadio {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable Radio if isDisabled is passed', () => {
    const { getByTestId } = render(<RadioGroupRadio {...defaultProps} isDisabled data-testid="disabled-option" />);
    expect(getByTestId('disabled-option')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<RadioGroupRadio {...defaultProps} hint="test hint" />);
    expect(getByText('test hint')).toBeInTheDocument();
  });

  it('should have Radios be bigger when size is large', () => {
    const { selector } = styles({ size: 'large' });

    expect(selector()).toContain('h-5 w-5');
  });

  it('should have correct styling on focus', () => {
    const { selector } = styles({ isFocusVisible: true });

    expect(selector()).toContain('focus-outline');
  });
});
