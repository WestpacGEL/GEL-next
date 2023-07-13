import { render } from '@testing-library/react';

import { Well } from './well.component.js';
import { type WellProps } from './well.types.js';

describe('Well component', () => {
  const defaultProps: WellProps = {
    children: 'Test Well',
    tag: 'div',
  };

  it('renders the Well component with default props', () => {
    const { getByText } = render(<Well {...defaultProps} />);
    expect(getByText(/Test Well/i)).toBeInTheDocument();
  });
});
