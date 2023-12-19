import { render } from '@testing-library/react';

import { PassCodeView } from './pass-code-view.component.js';
import { styles } from './pass-code-view.styles.js';

describe('PassCodeView', () => {
  it('renders the component', () => {
    const { container } = render(<PassCodeView />);
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style.base()).toBe('flex flex-col items-center');
    expect(style.heading()).toBe('typography-body-5 mb-3 font-bold');
    expect(style.link()).toBe('ml-1 cursor-pointer');
    expect(style.passCode()).toBe('my-3');
    expect(style.icon()).toBe('mb-3');
  });
});
