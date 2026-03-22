import { useRef } from 'react';
import { useMenuItem } from 'react-aria';
import { Node, TreeState } from 'react-stately';

export function MenuItem<T>({ item, state }: { item: Node<T>; state: TreeState<T> }) {
  const ref = useRef(null);
  const { menuItemProps } = useMenuItem({ key: item.key }, state, ref);
  return (
    <li {...menuItemProps} ref={ref} className="p-2 hover:bg-background-hero hover:text-text-mono">
      {item.rendered}
    </li>
  );
}
