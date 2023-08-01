import { render } from '@testing-library/react';

import { Icon } from './icon.component.js';
import { styles } from './icon.styles.js';

import * as AllIcons from './index.js';

describe('Icon', () => {
  it('renders the Icon component', () => {
    const { container } = render(
      <Icon copyrightYear="2023">
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12S0 18.627 0 12 5.372 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.064 4.137l1.4 1.399L8.6 18.4l-4.964-4.965 1.4-1.4L8.6 15.6l9.464-9.463z"
        />
      </Icon>,
    );
    expect(container).toBeInTheDocument();
  });

  Object.entries(AllIcons).forEach(([iconName, Icon]) => {
    it(`renders the ${iconName} component`, () => {
      const { container } = render(<Icon copyrightYear="2023" />);
      expect(container).toBeInTheDocument();
    });

    it(`renders the outlined version of the ${iconName} component`, () => {
      const { container } = render(<Icon look="outlined" copyrightYear="2023" />);
      expect(container).toBeInTheDocument();
    });
  }, []);

  it('renders the style correctly', () => {
    const style = styles({ color: 'primary' });
    expect(style).toBe('rounded transition-colors disabled:pointer-events-none disabled:opacity-50 text-primary');
  });
});
