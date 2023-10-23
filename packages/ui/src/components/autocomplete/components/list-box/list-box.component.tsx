import * as React from 'react';
import { useListBox } from 'react-aria';

import { ListBoxSection, Option } from './components/index.js';
import { ListBoxProps } from './list-box.types.js';

/**
 * @private
 */
export function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);

  const { listBoxRef = ref, state } = props;

  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className="max-h-[400px] w-full overflow-auto outline-none">
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}
