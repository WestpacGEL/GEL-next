import { render } from '@testing-library/react';

import { ProgressRope } from './progress-rope.component.js';
import { styles } from './progress-rope.styles.js';
import { ProgressRopeProps } from './progress-rope.types.js';

describe('ProgressRope', () => {
  it('renders the component', () => {
    const PROGRESS_ROPE_DATA: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [
          { text: <h3>Step 1</h3>, onClick: vitest.fn() },
          { text: <h3>Step 2</h3>, onClick: vitest.fn() },
        ],
      },
      { text: <h3>Step 3</h3>, onClick: vitest.fn() },
      { text: <h3>Review and Submit</h3>, onClick: vitest.fn() },
    ];

    const { container, getByLabelText, getByText } = render(
      <ProgressRope aria-label="test assistive text" current={0} data={PROGRESS_ROPE_DATA} />,
    );
    expect(container).toBeInTheDocument();
    expect(getByLabelText(/test assistive text/i)).toBeInTheDocument();
    expect(getByText(/group 1/i)).toBeInTheDocument();
    expect(getByText(/Step 1/i)).toBeInTheDocument();
    expect(getByText(/Step 2/i)).toBeInTheDocument();
    expect(getByText(/Step 3/i)).toBeInTheDocument();
  });

  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe(
      'relative after:absolute after:bottom-4 after:left-1 after:top-[1.0625rem] after:z-0 after:block after:border-l-2 after:border-dotted after:border-borderDark',
    );
  });
});
