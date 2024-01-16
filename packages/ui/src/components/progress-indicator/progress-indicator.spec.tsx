import { render } from '@testing-library/react';

import { ProgressIndicator } from './progress-indicator.component.js';

describe('ProgressIndicator', () => {
  it('renders the component', () => {
    const { container } = render(<ProgressIndicator />);
    expect(container).toBeInTheDocument();
  });
});
