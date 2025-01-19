import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HelpIcon } from '../icon/index.js';

import { Popover } from './popover.component.js';

describe('Popover', () => {
  const panelContent = 'Test content';

  it('renders the component', () => {
    const { container } = render(<Popover content={panelContent}>Test</Popover>);
    expect(container).toBeInTheDocument();
  });

  it('should render icon for button when icon passed', () => {
    const { getByLabelText } = render(<Popover content={panelContent} icon={HelpIcon} />);
    expect(getByLabelText('Help')).toBeInTheDocument();
  });

  it('should render popover when button clicked and handle callback with native event to let parent consume event object as per needs', async () => {
    const handleParentOnClick = vi
      .fn()
      .mockImplementation((event: React.MouseEvent<HTMLElement>) => event.stopPropagation());
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <Popover content={panelContent} onClick={handleParentOnClick}>
        Test
      </Popover>,
    );
    await act(() => {
      user.click(getByRole('button', { name: 'Test' }));
    });
    await waitFor(() => {
      expect(getByText(panelContent)).toBeInTheDocument();
    });
    await waitFor(() => expect(handleParentOnClick).toHaveReturned());
  });

  it('should render heading when heading passed as prop', () => {
    const { getByText } = render(
      <Popover content={panelContent} heading="test heading" open>
        Test
      </Popover>,
    );

    expect(getByText('test heading')).toBeInTheDocument();
  });

  it('should show the popover by default if open is passed as prop', () => {
    const { getByText } = render(
      <Popover content={panelContent} open>
        Test
      </Popover>,
    );

    expect(getByText(panelContent)).toBeInTheDocument();
  });

  it('should close popover when close button clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<Popover content={panelContent}>Test</Popover>);
    await act(() => {
      user.click(getByRole('button', { name: 'Test' }));
    });
    await waitFor(() => {
      expect(getByText(panelContent)).toBeInTheDocument();
    });
    await act(() => {
      user.click(getByRole('button', { name: 'Close popover' }));
    });
    await waitFor(() => {
      expect(queryByText(panelContent)).not.toBeInTheDocument();
    });
  });

  it('should close popover when esc key pressed', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<Popover content={panelContent}>Test</Popover>);
    await act(() => {
      user.click(getByRole('button', { name: 'Test' }));
    });
    await waitFor(() => {
      expect(getByText(panelContent)).toBeInTheDocument();
    });
    await act(() => {
      user.keyboard('[Escape]');
    });
    await waitFor(() => {
      expect(queryByText(panelContent)).not.toBeInTheDocument();
    });
  });
});
