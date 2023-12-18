import { render } from '@testing-library/react';

import { PassCodeView } from './pass-code-view.component.js';
import { styles } from './pass-code-view.styles.js';

describe('PassCodeView', () => {
  it('renders the component', () => {
    const { container } = render(<PassCodeView />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
