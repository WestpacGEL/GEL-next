import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { BottomSheetModal } from './bottom-sheet-modal.component.js';

describe('BottomSheetModal', () => {
  it('renders the Modal', () => {
    const { result } = renderHook(() => useOverlayTriggerState({}));
    render(<BottomSheetModal children={undefined} state={result.current} />);
  });

  it('shows the content when the state isOpen is true', async () => {
    const { result } = renderHook(() =>
      useOverlayTriggerState({
        isOpen: true,
      }),
    );
    const { getByText } = render(
      <BottomSheetModal state={result.current}>
        <h3>test</h3>
      </BottomSheetModal>,
      { container: document.body },
    );
    expect(getByText('test')).toBeVisible();
  });
});
