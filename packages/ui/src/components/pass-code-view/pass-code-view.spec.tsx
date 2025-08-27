import { render } from '@testing-library/react';

import { PassCodeView } from './pass-code-view.component.js';

describe('PassCodeView', () => {
  it('renders the component', () => {
    const { container } = render(<PassCodeView />);
    expect(container).toBeInTheDocument();
  });
});
