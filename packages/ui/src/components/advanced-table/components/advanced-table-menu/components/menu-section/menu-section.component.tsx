import { useMenuSection } from 'react-aria';
import { Node, TreeState } from 'react-stately';

import { MenuItem } from '../menu-item/menu-item.component.js';

export function MenuSection<T extends object>({ section, state }: { section: Node<T>; state: TreeState<T> }) {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <li {...itemProps}>
      {section.rendered && (
        <span
          {...headingProps}
          className="m-1 flex h-6 items-center bg-surface-muted-faint px-1 align-middle typography-body-10 text-text-hero"
        >
          {section.rendered}
        </span>
      )}
      <ul {...groupProps} className="flex flex-col gap-1">
        {/* eslint-disable-next-line sonarjs/deprecation -- TreeCollection does not implement getChildren */}
        {[...section.childNodes].map(item => {
          if (item.key === 'filter')
            return (
              <li key={item.key} className="p-2" role="none">
                {item.rendered}
              </li>
            );

          return <MenuItem key={item.key} item={item} state={state} />;
        })}
      </ul>
    </li>
  );
}
