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
      'form-control overflow-ellipsis bg-no-repeat select-caret disabled:form-control-disabled group-first/add-on-before:!rounded-l group-first/add-on-before:rounded-r-none group-first/add-on-before:!border-x group-last/add-on-after:!rounded-r group-last/add-on-after:rounded-l-none group-last/add-on-after:!border-x group-[.input-group-after]:rounded-r-none group-[.input-group-before]:rounded-l-none group-[.input-group-after]:border-r-0 group-[.input-group-before]:border-l-0 form-control-medium bg-[right_0.75rem_center] pr-[calc(0.5rem+14px+0.75rem)] border-borderDark',
    );
  });
});
