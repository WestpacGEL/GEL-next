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
      'form-control bg-no-repeat select-caret disabled:form-control-disabled focus:focus-outline form-control-medium bg-[right_0.75rem_center] pr-[calc(0.5rem+14px+0.75rem)]',
    );
  });
});
