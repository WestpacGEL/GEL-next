import { render } from '@testing-library/react';

import { Button } from './button.component.js';
import { styles } from './button.styles.js';

describe('Buttons', () => {
  it('renders the component', () => {
    const { container } = render(<Button value="Option 1">Test</Button>);
    expect(container).toBeInTheDocument();
  });

  it('should have correct styling on focus', () => {
    const { button } = styles({ isFocusVisible: true });

    expect(button()).toContain('focus-outline');
  });
});
