import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type FormEvent } from 'react';

import { ProgressRope } from './progress-rope.component.js';
import { ProgressRopeProps } from './progress-rope.types.js';

describe('ProgressRope', () => {
  it('renders a labelled navigation containing grouped and ungrouped steps', () => {
    const progressRopeData: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [
          { text: 'Step 1', onClick: vitest.fn() },
          { text: 'Step 2', onClick: vitest.fn() },
        ],
      },
      { text: 'Step 3', onClick: vitest.fn() },
      { text: 'Review and Submit', onClick: vitest.fn() },
    ];

    const { getByRole, getByText } = render(<ProgressRope current={0} data={progressRopeData} />);

    expect(getByRole('navigation', { name: 'In this form' })).toBeInTheDocument();
    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Step 1')).toBeInTheDocument();
    expect(getByText('Step 2')).toBeInTheDocument();
    expect(getByText('Step 3')).toBeInTheDocument();
    expect(getByText('Review and Submit')).toBeInTheDocument();
  });

  it('forwards wrapper attributes and uses the requested group heading level', () => {
    const progressRopeData: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 1' }],
      },
    ];

    const { getByRole } = render(
      <ProgressRope
        aria-label="Application progress"
        className="mt-1"
        current={0}
        data={progressRopeData}
        data-testid="progress-rope"
        headingTag="h4"
        tag="aside"
      />,
    );

    const rope = getByRole('navigation', { name: 'Application progress' });

    expect(rope).toHaveProperty('tagName', 'ASIDE');
    expect(rope).toHaveClass('mt-1');
    expect(rope).toHaveAttribute('data-testid', 'progress-rope');
    expect(getByRole('heading', { level: 4, name: /Group 1/i })).toBeInTheDocument();
  });

  it('keeps reached steps navigable and future steps disabled', async () => {
    const user = userEvent.setup();
    const firstStepClick = vitest.fn();
    const groupedStepClick = vitest.fn();
    const currentStepClick = vitest.fn();
    const futureStepClick = vitest.fn();
    const progressRopeData: ProgressRopeProps['data'] = [
      { text: 'Step 1', onClick: firstStepClick },
      {
        type: 'group',
        text: 'Group 1',
        steps: [
          { text: 'Step 2', onClick: groupedStepClick },
          { text: 'Step 3', onClick: currentStepClick },
        ],
      },
      { text: 'Step 4', onClick: futureStepClick },
    ];

    const { getByRole } = render(<ProgressRope current={2} data={progressRopeData} />);

    const firstStep = getByRole('button', { name: /Step 1/i });
    const groupedStep = getByRole('button', { name: /Step 2/i });
    const currentStep = getByRole('button', { name: /Step 3/i });
    const futureStep = getByRole('button', { name: /Step 4/i });

    expect(getByRole('button', { name: /Group 1/i })).toHaveAttribute('aria-expanded', 'true');
    expect(firstStep).toBeEnabled();
    expect(groupedStep).toBeEnabled();
    expect(currentStep).toBeEnabled();
    expect(futureStep).toBeDisabled();
    expect(firstStep).toHaveAttribute('type', 'button');
    expect(groupedStep).toHaveAttribute('type', 'button');

    await user.click(firstStep);
    await user.click(groupedStep);
    await user.click(currentStep);
    await user.click(futureStep);

    expect(firstStepClick).toHaveBeenCalledOnce();
    expect(groupedStepClick).toHaveBeenCalledOnce();
    expect(currentStepClick).toHaveBeenCalledOnce();
    expect(futureStepClick).not.toHaveBeenCalled();
  });

  it('retains the furthest visited step when the user returns to an earlier step', async () => {
    const user = userEvent.setup();
    const thirdStepClick = vitest.fn();
    const progressRopeData: ProgressRopeProps['data'] = [
      { text: 'Step 1' },
      { text: 'Step 2' },
      { text: 'Step 3', onClick: thirdStepClick },
      { text: 'Step 4' },
    ];

    const { getByRole, rerender } = render(<ProgressRope current={2} data={progressRopeData} />);

    rerender(<ProgressRope current={0} data={progressRopeData} />);

    const thirdStep = getByRole('button', { name: /Step 3.*complete/i });

    expect(thirdStep).toBeEnabled();
    expect(getByRole('button', { name: /Step 4.*not started/i })).toBeDisabled();

    await user.click(thirdStep);

    expect(thirdStepClick).toHaveBeenCalledOnce();
  });

  it('does not allow a future group to be expanded', async () => {
    const user = userEvent.setup();
    const progressRopeData: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 1' }],
      },
      {
        type: 'group',
        text: 'Group 2',
        steps: [{ text: 'Step 2' }],
      },
    ];

    const { getByRole, getByText } = render(<ProgressRope current={0} data={progressRopeData} />);
    const firstGroup = getByRole('button', { name: /Group 1/i });
    const secondGroup = getByRole('button', { name: /Group 2/i });
    const firstStep = getByText('Step 1').closest('button');
    const secondStep = getByText('Step 2').closest('button');

    expect(firstGroup).toHaveAttribute('aria-expanded', 'true');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'false');
    expect(secondGroup).toBeDisabled();
    expect(firstStep).toHaveAttribute('tabindex', '0');
    expect(secondStep).toHaveAttribute('tabindex', '-1');

    await user.click(secondGroup);

    expect(firstGroup).toHaveAttribute('aria-expanded', 'true');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'false');
    expect(firstStep).toHaveAttribute('tabindex', '0');
    expect(secondStep).toHaveAttribute('tabindex', '-1');
  });

  it('does not submit an ancestor form when a step or group is selected', async () => {
    const user = userEvent.setup();
    const onSubmit = vitest.fn((event: FormEvent) => event.preventDefault());
    const progressRopeData: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 1', onClick: vitest.fn() }],
      },
    ];

    const { getByRole } = render(
      <form onSubmit={onSubmit}>
        <ProgressRope current={0} data={progressRopeData} />
      </form>,
    );

    await user.click(getByRole('button', { name: /Step 1/i }));
    await user.click(getByRole('button', { name: /Group 1/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
