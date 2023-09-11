import { render } from '@testing-library/react';

import { Modal } from './modal.component.js';

describe('Modal', () => {
  it('renders the component', () => {
    const { container } = render(<Modal />);
    expect(container).toBeInTheDocument();
  });
});
