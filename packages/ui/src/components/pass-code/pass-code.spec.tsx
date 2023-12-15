import { render } from '@testing-library/react';

import { PassCode } from './pass-code.component.js';
import { styles } from './pass-code.styles.js';

describe('PassCode', () => {
  it('renders the component', () => {
    const { container } = render(
      <PassCode
        length={4}
        onComplete={(passcode: string) => {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
