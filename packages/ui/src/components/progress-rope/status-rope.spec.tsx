import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type FormEvent } from 'react';

import { StatusRope } from './status-rope.component.js';
import { StatusRopeProps } from './status-rope.types.js';

describe('StatusRope', () => {
  it('renders a labelled region with grouped and ungrouped status steps', () => {
    const statusRopeData: StatusRopeProps['data'] = [
      { text: 'Step 1', description: 'Additional step information' },
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 2', description: 'More step information' }],
      },
      { text: 'Step 3', description: 'Final step information' },
    ];

    const { getByRole, getByText } = render(
      <StatusRope aria-label="Application status" className="mt-1" current={0} data={statusRopeData} />,
    );

    expect(getByRole('region', { name: 'Application status' })).toHaveClass('mt-1');
    expect(getByText('Step 1')).toBeInTheDocument();
    expect(getByText('Additional step information')).toBeInTheDocument();
    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('More step information')).toBeInTheDocument();
    expect(getByText('Step 3')).toBeInTheDocument();
  });

  it('renders status step subtext with its default styling', () => {
    const statusRopeData: StatusRopeProps['data'] = [
      { text: 'Step 1', description: 'Additional step information' },
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 2', description: 'More step information' }],
      },
    ];

    const { getByRole, getByText } = render(<StatusRope current={0} data={statusRopeData} />);
    const label = getByText('Step 1').parentElement;

    expect(label).toHaveClass('grid', 'grid-cols-[auto_1fr]', 'items-center');
    expect(label?.parentElement).toHaveClass('pb-[1.875rem]', 'typography-body-10', 'text-text-body');
    expect(label?.parentElement).not.toHaveClass('font-bold');
    expect(getByText('Additional step information')).toHaveClass(
      'col-start-2',
      'pt-1',
      'typography-body-10',
      'font-normal',
      'text-text-muted',
    );
    expect(getByText('Step 2').closest('[aria-current]')).toHaveClass('text-text-muted');

    const groupButton = getByRole('button', { name: /Group 1/i });

    expect(groupButton).toHaveClass('h-[3rem]', 'cursor-default', 'py-0', 'typography-body-9', 'text-text-body');
    expect(groupButton.firstElementChild).toHaveClass('cursor-pointer');
    expect(groupButton.querySelector('svg')).toHaveAttribute('aria-label', 'Expand More');
    expect(groupButton.querySelector('svg')).toHaveClass('size-3', 'text-text-primary');
    expect(getByText('Group 1')).toHaveClass('cursor-pointer', 'gap-1');
  });

  it('uses the status layout when subtext is undefined', () => {
    const statusRopeData: StatusRopeProps['data'] = [{ text: 'Step 1', description: undefined }];

    const { getByText } = render(<StatusRope current={0} data={statusRopeData} />);

    expect(getByText('Step 1').parentElement).toHaveClass('grid', 'grid-cols-[auto_1fr]', 'items-center');
  });

  it('opens and closes groups independently while keeping the current group open', async () => {
    const user = userEvent.setup();
    const statusRopeData: StatusRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 1', description: 'First step information' }],
      },
      {
        type: 'group',
        text: 'Group 2',
        steps: [{ text: 'Step 2', description: 'Second step information' }],
      },
    ];

    const { getByRole, getByText, rerender } = render(<StatusRope current={0} data={statusRopeData} />);
    const firstGroup = getByRole('button', { name: /Group 1/i });
    const secondGroup = getByRole('button', { name: /Group 2/i });

    expect(firstGroup).toHaveAttribute('aria-expanded', 'true');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'false');
    expect(getByText('Step 1').closest('[aria-current]')).toHaveAttribute('aria-current', 'step');

    rerender(<StatusRope current={1} data={statusRopeData} />);

    expect(firstGroup).toHaveAttribute('aria-expanded', 'true');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Step 2').closest('[aria-current]')).toHaveAttribute('aria-current', 'step');

    await user.click(firstGroup);

    expect(firstGroup).toHaveAttribute('aria-expanded', 'false');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'true');

    await user.click(firstGroup);

    expect(firstGroup).toHaveAttribute('aria-expanded', 'true');
    expect(secondGroup).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles groups without submitting an ancestor form', async () => {
    const user = userEvent.setup();
    const onSubmit = vitest.fn((event: FormEvent) => event.preventDefault());
    const statusRopeData: StatusRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [{ text: 'Step 1', description: 'Additional step information' }],
      },
    ];

    const { getByRole } = render(
      <form onSubmit={onSubmit}>
        <StatusRope current={0} data={statusRopeData} />
      </form>,
    );
    const groupButton = getByRole('button', { name: /Group 1/i });

    expect(groupButton).toHaveAttribute('type', 'button');
    expect(groupButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(groupButton);

    expect(groupButton.querySelector('svg')).toHaveAttribute('aria-label', 'Expand More');
    expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('ends the status rope connector at the final circle', () => {
    const statusRopeData: StatusRopeProps['data'] = [
      { text: 'Step 1', description: 'Additional step information' },
      { text: 'Final step', description: 'Final step information' },
    ];

    const { getByText } = render(<StatusRope current={2} data={statusRopeData} />);
    const finalStepLabel = getByText('Final step').parentElement;

    expect(finalStepLabel?.parentElement).toHaveClass('after:top-0', 'after:h-[1.25rem]');
    expect(finalStepLabel).toHaveClass('after:top-[1.25rem]', 'after:bottom-0', 'after:border-background-white');
  });
});
