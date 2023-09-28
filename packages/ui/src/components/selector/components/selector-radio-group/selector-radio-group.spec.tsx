import { render } from '@testing-library/react';

import { SelectorRadioGroup } from './selector-radio-group.component.js';
import { styles } from './selector-radio-group.styles.js';

describe('SelectorRadioGroup', () => {
  it('renders the component', () => {
    const { container } = render(<SelectorRadioGroup />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
