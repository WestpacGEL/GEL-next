import { render } from '@testing-library/react';

import { Field } from './field.component.js';
import { styles } from './field.styles.js';

describe('Field', () => {
  it('renders the component', () => {
    const { container } = render(<Field />);
    expect(container).toBeInTheDocument();
  });
});
