import React from 'react';
import { useListBox } from 'react-aria';

import { ListBoxSection } from '../list-box-section/list-box-section.component.js';
import { Option } from '../option/option.component.js';

import { styles as listBoxStyles } from './list-box.styles.js';

import type { ListBoxProps } from './list-box.types.js';

export function ListBox({ filterText, ...props }: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  const styles = listBoxStyles();

  return (
    <ul {...listBoxProps} ref={listBoxRef} className={styles.ul()}>
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <ListBoxSection filterText={filterText} key={item.key} section={item} state={state} />
        ) : (
          <Option filterText={filterText} key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}
