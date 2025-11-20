import * as React from 'react';
import { useListBox } from 'react-aria';

import { AutocompleteListBoxProps } from './autocomplete-list-box.types.js';
import { AutocompleteListBoxOption, AutocompleteListBoxSection } from './components/index.js';

/**
 * @private
 */
export function AutocompleteListBox(props: AutocompleteListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);

  const { listBoxRef = ref, state } = props;

  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className="max-h-[400px] w-full overflow-auto outline-none">
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <AutocompleteListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <AutocompleteListBoxOption key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}
