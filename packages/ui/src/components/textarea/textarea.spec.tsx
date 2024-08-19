import { render } from '@testing-library/react';

import { Textarea } from './textarea.component.js';
import { styles } from './textarea.styles.js';

describe('Textarea', () => {
  it('renders the component', () => {
    const { container } = render(<Textarea />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles({ size: 'medium' });
    // TODO: use some variants for test
    expect(style).toBe(
      'form-control w-full read-only:form-control-disabled disabled:form-control-disabled form-control-medium min-h-[3.375rem] border-borderDark',
    );
  });
});
