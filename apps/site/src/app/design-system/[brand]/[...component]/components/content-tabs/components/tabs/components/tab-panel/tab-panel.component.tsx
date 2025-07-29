import { useRef } from 'react';
import { AriaTabProps, useTabPanel } from 'react-aria';
import { TabListState } from 'react-stately';

export function TabPanel({ state, ...props }: { state: TabListState<AriaTabProps> }) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      {state.selectedItem?.props.children}
    </div>
  );
}
