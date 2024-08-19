import { render } from '@testing-library/react';

import { Input } from './input.component.js';
import { styles } from './input.styles.js';

describe('Input', () => {
  it('renders the component', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ size: 'medium' });
    // TODO: use some variants for test
    expect(style).toBe(
      'form-control flex-1 read-only:form-control-disabled disabled:form-control-disabled group-[.input-group-after]:rounded-r-none group-[.input-group-before]:rounded-l-none group-[.input-group-after]:border-r-0 group-[.input-group-before]:border-l-0 form-control-medium group-[.input-group-inset-after]:pr-7 group-[.input-group-inset-before]:pl-7 border-borderDark',
    );
  });
});
