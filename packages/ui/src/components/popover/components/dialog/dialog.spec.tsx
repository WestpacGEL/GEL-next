import { render } from '@testing-library/react';

import { Dialog } from './dialog.component.js';

describe('Dialog', () => {
  it('renders the component', () => {
    const { container } = render(<Dialog> test </Dialog>);
    expect(container).toBeInTheDocument();
  });
});
