import { render } from '@testing-library/react';

import { SelectorCheckboxGroup } from './selector-checkbox-group.component.js';
import { styles } from './selector-checkbox-group.styles.js';

describe('SelectorCheckboxGroup', () => {
  it('renders the component', () => {
    const { container } = render(<SelectorCheckboxGroup />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
