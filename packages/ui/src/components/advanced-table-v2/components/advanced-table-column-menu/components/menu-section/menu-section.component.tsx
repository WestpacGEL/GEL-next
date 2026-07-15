import { useMenuSection } from 'react-aria';

import { MenuItem } from '../menu-item/menu-item.component.js';

import { styles as menuSectionStyles } from './menu-section.styles.js';
import { MenuSectionProps } from './menu-section.types.js';

export function MenuSection<T extends object>({ section, state }: MenuSectionProps<T>) {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  const styles = menuSectionStyles();

  return (
    <li {...itemProps} className={styles.section()}>
      {section.rendered && (
        <span {...headingProps} className={styles.heading()}>
          {section.rendered}
        </span>
      )}
      <ul {...groupProps} className={styles.group()}>
        {/* eslint-disable-next-line sonarjs/deprecation -- TreeCollection does not implement getChildren */}
        {[...section.childNodes].map(item => {
          if (item.key === 'filter')
            return (
              <li key={item.key} className={styles.filterItem()} role="none">
                {item.rendered}
              </li>
            );

          return <MenuItem key={item.key} item={item} state={state} />;
        })}
      </ul>
    </li>
  );
}
