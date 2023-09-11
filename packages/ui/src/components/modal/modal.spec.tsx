import { render, renderHook, screen } from '@testing-library/react';
import { useOverlayTriggerState } from 'react-stately';

import { Modal } from './modal.component.js';

describe('Modal', () => {
  it('renders the component', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: true }));

    render(<Modal state={result.current}>Content</Modal>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  it('not shows when it is hidden', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: false }));

    render(<Modal state={result.current}>Content</Modal>);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
