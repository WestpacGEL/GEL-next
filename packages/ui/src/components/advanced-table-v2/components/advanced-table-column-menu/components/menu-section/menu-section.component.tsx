import { useEffect, useId, useRef } from 'react';
import { useMenuSection } from 'react-aria';

import { MenuItem } from '../menu-item/menu-item.component.js';

import { styles as menuSectionStyles } from './menu-section.styles.js';
import { MenuSectionProps } from './menu-section.types.js';

export function MenuSection<T extends object>({ section, state }: MenuSectionProps<T>) {
  const groupId = useId();
  const { headingProps } = useMenuSection({
    'aria-label': section['aria-label'],
    heading: section.rendered,
  });

  const styles = menuSectionStyles();

  const filterRef = useRef<HTMLDivElement>(null);
  const { focusedKey } = state.selectionManager;

  // The filter row is a raw <input> not a MenuItem, focus on the actual input instead when navigating the menu
  useEffect(() => {
    if (focusedKey === 'filter') {
      filterRef.current?.querySelector('input')?.focus();
    }
  }, [focusedKey]);

  return (
    <div
      aria-label={section.rendered ? undefined : section['aria-label']}
      aria-labelledby={section.rendered ? groupId : undefined}
      className={styles.section()}
      role="group"
    >
      {section.rendered && (
        <span {...headingProps} className={styles.heading()} id={groupId}>
          {section.rendered}
        </span>
      )}
      {/* eslint-disable-next-line sonarjs/deprecation -- TreeCollection does not implement getChildren */}
      {[...section.childNodes].map(item => {
        if (item.key === 'filter')
          return (
            <div className={styles.filterItem()} key={item.key} ref={filterRef} role="none">
              {item.rendered}
            </div>
          );

        return <MenuItem key={item.key} item={item} state={state} />;
      })}
    </div>
  );
}
