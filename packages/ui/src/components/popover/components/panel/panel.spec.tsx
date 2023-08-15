import { render, renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Panel } from './panel.component.js';

describe('Panel', () => {
  it('renders the component', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: true, defaultOpen: true }));
    const ref = createRef<Element>();
    const { container } = render(
      <>
        <Panel state={result.current} triggerRef={ref}>
          Test
        </Panel>
      </>,
    );
    expect(container).toBeInTheDocument();
  });
});
