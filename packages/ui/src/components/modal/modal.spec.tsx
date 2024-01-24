import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOverlayTriggerState } from 'react-stately';

import { Modal } from './modal.component.js';

import { ModalBody, ModalFooter } from './index.js';

describe('Modal', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: true }));

    render(<Modal state={result.current}>Content</Modal>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  it('does not show when it is hidden', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: false }));

    render(<Modal state={result.current}>Content</Modal>);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
  it('shows the footer content', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: true }));

    render(
      <Modal state={result.current}>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>,
    );

    expect(screen.getByText('Footer')).toBeVisible();
  });
  it('shows the footer content', async () => {
    const { result } = renderHook(() => useOverlayTriggerState({ defaultOpen: true }));

    render(
      <Modal state={result.current} isDismissable>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>,
    );

    expect(screen.getByLabelText('Close modal')).toBeVisible();
    await act(async () => {
      await user.click(screen.getByLabelText('Close modal'));
    });
    expect(result.current.isOpen).toBe(false);
  });
});
