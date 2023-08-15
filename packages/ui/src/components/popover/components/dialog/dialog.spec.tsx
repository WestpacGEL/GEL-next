import { render } from '@testing-library/react';

import { Dialog } from './dialog.component.js';
import { styles } from './dialog.styles.js';

describe('Dialog', () => {
  it('renders the component', () => {
    const { container } = render(<Dialog> test </Dialog>);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
