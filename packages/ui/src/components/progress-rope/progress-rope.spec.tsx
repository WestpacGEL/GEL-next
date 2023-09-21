import { render } from '@testing-library/react';

import { ProgressRope } from './progress-rope.component.js';
import { styles } from './progress-rope.styles.js';

describe('ProgressRope', () => {
  it('renders the component', () => {
    const { container } = render(<ProgressRope />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
