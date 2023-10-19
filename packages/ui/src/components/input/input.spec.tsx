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
      'form-control flex-1 read-only:form-control-disabled disabled:form-control-disabled group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0 form-control-medium group-[.input-field-inset-after]:pr-7 group-[.input-field-inset-before]:pl-7',
    );
  });
});
