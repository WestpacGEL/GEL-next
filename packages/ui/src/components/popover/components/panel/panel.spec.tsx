import { render, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';

import { Panel } from './panel.component.js';
import { styles } from './panel.styles.js';

describe('Panel', () => {
  it('renders the component', () => {
    const { result } = renderHook(() => useOverlayTriggerState({ isOpen: true, defaultOpen: true }));
    const ref = useRef(null);
    const { container } = render(
      <>
        <Button ref={ref}>Test</Button>
        <Panel state={result.current} triggerRef={ref}>
          Test
        </Panel>
      </>,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('');
  });
});
