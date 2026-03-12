import { act, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOverlayTriggerState } from 'react-stately';

import { BottomSheet } from './bottom-sheet.component.js';

const user = userEvent.setup();

describe('Bottom Sheet', () => {
  it('renders the bottom sheet', () => {
    const { result } = renderHook(() => useOverlayTriggerState({}));
    render(<BottomSheet state={result.current}>{undefined}</BottomSheet>);
  });

  it('shows the content when the state isOpen is true', async () => {
    const { result } = renderHook(() =>
      useOverlayTriggerState({
        isOpen: true,
      }),
    );
    const { findByText } = render(
      <BottomSheet state={result.current}>
        <h3>test</h3>
      </BottomSheet>,
      { container: document.body },
    );
    expect(await findByText('test')).toBeVisible();
  });

  it('closes the content once the close button is clicked', async () => {
    const { result } = renderHook(() =>
      useOverlayTriggerState({
        defaultOpen: true,
      }),
    );
    const { findByRole } = render(
      <BottomSheet state={result.current} isDismissable>
        <h3>test</h3>
      </BottomSheet>,
      { container: document.body },
    );

    const closeButton = await findByRole('button');
    await act(() => user.click(closeButton));
    expect(result.current.isOpen).toBeFalsy();
  });
});
