import { render } from '@testing-library/react';

import { Radio } from './radio.component.js';
import { styles } from './radio.styles.js';
import { RadioProps } from './radio.types.js';

describe('Radio', () => {
  const defaultProps: RadioProps = {
    value: 'Option 1',
    children: 'Option 1',
  };

  it('renders the component', () => {
    const { container } = render(<Radio {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct text for Radio', () => {
    const { getByText } = render(<Radio {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('should disable Radio if isDisabled is passed', () => {
    const { getByTestId } = render(<Radio {...defaultProps} isDisabled data-testid="disabled-option" />);
    expect(getByTestId('disabled-option')).toBeDisabled();
  });

  it('should render hint if hint is passed', () => {
    const { getByText } = render(<Radio {...defaultProps} hint="test hint" />);
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
