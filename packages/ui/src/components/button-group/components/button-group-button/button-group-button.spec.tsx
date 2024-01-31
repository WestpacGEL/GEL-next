import { render } from '@testing-library/react';

import { ButtonGroupButton } from './button-group-button.component.js';
import { styles } from './button-group-button.styles.js';

describe('ButtonGroupButton', () => {
  it('renders the component', () => {
    const { container } = render(<ButtonGroupButton value="Option 1" label="Option 1" />);
    expect(container).toBeInTheDocument();
  });

  it('should have correct styling on focus', () => {
    const { button } = styles({ isFocusVisible: true });

    expect(button()).toContain('focus-outline');
  });
});
