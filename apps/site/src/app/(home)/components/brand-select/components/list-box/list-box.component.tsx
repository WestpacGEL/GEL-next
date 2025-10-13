import * as React from 'react';
import { useListBox } from 'react-aria';

import { ListBoxSection, Option } from './components';
import { ListBoxProps } from './list-box.types';

export function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);

  const { listBoxRef = ref, state } = props;

  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="xsl:px-5 xsl:pb-5 max-h-[25rem] w-full overflow-auto px-4 pt-2 pb-4 outline-none"
    >
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
