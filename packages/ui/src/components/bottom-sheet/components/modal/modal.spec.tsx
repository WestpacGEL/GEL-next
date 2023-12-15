import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Modal } from './modal.component.js';

describe('Modal', () => {
  it('renders the Modal', () => {
    const { result } = renderHook(() => useOverlayTriggerState({}));
    render(<Modal children={undefined} state={result.current} />);
  });

  it('shows the content when the state isOpen is true', async () => {
    const { result } = renderHook(() =>
      useOverlayTriggerState({
        isOpen: true,
      }),
    );
    const { getByText } = render(
      <Modal state={result.current}>
        <h3>test</h3>
      </Modal>,
      { container: document.body },
    );
    expect(getByText('test')).toBeVisible();
  });
});
