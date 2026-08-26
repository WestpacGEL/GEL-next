import { fireEvent, render } from '@testing-library/react';

import { ProgressRope, StatusRope } from './progress-rope.component.js';
import { ProgressRopeProps, StatusRopeProps } from './progress-rope.types.js';

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

  it('renders status step subtext with its default styling', () => {
    const STATUS_ROPE_DATA: StatusRopeProps['data'] = [
      { text: 'Step 1', subText: 'Additional step information' },
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 2', subText: 'More step information' }],
      },
    ];

    const { getByRole, getByText } = render(<StatusRope current={0} data={STATUS_ROPE_DATA} />);

    const label = getByText('Step 1').parentElement;

    expect(label).toHaveClass('grid', 'grid-cols-[auto_1fr]', 'items-center');
    expect(label?.parentElement).toHaveClass('pb-[1.875rem]', 'typography-body-10', 'text-text-body');
    expect(label?.parentElement).not.toHaveClass('font-bold');
    expect(getByText('Additional step information')).toHaveClass(
      'col-start-2',
      'pt-[0.625rem]',
      'typography-body-10',
      'font-normal',
      'text-text-muted',
    );
    const groupButton = getByRole('button', { name: /Group 1/i });

    expect(groupButton).toHaveClass('h-[3rem]', 'py-0', 'typography-body-9', 'text-text-body');
    expect(groupButton.querySelector('svg')).toHaveAttribute('aria-label', 'Expand More');
    expect(groupButton.querySelector('svg')).toHaveClass('size-3', 'text-text-primary');
    expect(getByText('Group 1')).toHaveClass('gap-1');

    fireEvent.click(groupButton);

    expect(groupButton.querySelector('svg')).toHaveAttribute('aria-label', 'Expand Less');
  });

  it('ends the status rope connector at the final circle', () => {
    const STATUS_ROPE_DATA: StatusRopeProps['data'] = [
      { text: 'Step 1', subText: 'Additional step information' },
      { text: 'Final step', subText: 'Final step information' },
    ];

    const { getByText } = render(<StatusRope current={2} data={STATUS_ROPE_DATA} />);

    const finalStepLabel = getByText('Final step').parentElement;

    expect(finalStepLabel?.parentElement).toHaveClass('after:top-0', 'after:h-[1.25rem]');
    expect(finalStepLabel).toHaveClass('after:top-[1.25rem]', 'after:bottom-0', 'after:border-background-white');
  });
});
