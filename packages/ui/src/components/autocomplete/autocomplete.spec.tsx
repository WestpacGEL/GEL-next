import { render } from '@testing-library/react';

import { Autocomplete } from './autocomplete.component.js';
import { styles } from './autocomplete.styles.js';

describe('Autocomplete', () => {
  it('renders the component', () => {
    const { container } = render(<Autocomplete />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
