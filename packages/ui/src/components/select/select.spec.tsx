import { render } from '@testing-library/react';

import { Select } from './select.component.js';
import { styles } from './select.styles.js';

describe('Select', () => {
  it('renders the component', () => {
    const { container } = render(<Select />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ size: 'medium' });
    // TODO: use some variants for test
    expect(style).toBe(
      'form-control bg-no-repeat select-caret disabled:form-control-disabled group-[.add-on-after]:!rounded-r group-[.add-on-after]:rounded-l-none group-[.add-on-before]:!rounded-l group-[.add-on-before]:rounded-r-none group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.add-on-after]:!border-x group-[.add-on-before]:!border-x group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0 form-control-medium bg-[right_0.75rem_center] pr-[calc(0.5rem+14px+0.75rem)]',
    );
  });
});
