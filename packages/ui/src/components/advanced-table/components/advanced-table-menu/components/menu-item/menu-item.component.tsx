import { useRef } from 'react';
import { mergeProps, useFocusRing, useMenuItem } from 'react-aria';
import { Node, TreeState } from 'react-stately';

export function MenuItem<T>({ item, state }: { item: Node<T>; state: TreeState<T> }) {
  const ref = useRef(null);
  const { menuItemProps } = useMenuItem({ key: item.key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={`p-2 outline-none hover:bg-background-hero hover:text-text-mono ${isFocusVisible ? 'outline-focus' : ''}`}
    >
      {item.rendered}
    </li>
  );
}
