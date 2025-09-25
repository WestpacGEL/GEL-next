import { useRef } from 'react';
import { AriaMenuProps, useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';

import { MenuItem } from '../menu-item/menu-item.component.js';

export function MenuList<T extends object>(props: AriaMenuProps<T>) {
  const state = useTreeState(props);

  const ref = useRef(null);
  const { menuProps } = useMenu(props, state, ref);
  return (
    <ul {...menuProps} ref={ref} className="flex flex-col gap-1">
      {[...state.collection].map(item => (
        <MenuItem key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}
