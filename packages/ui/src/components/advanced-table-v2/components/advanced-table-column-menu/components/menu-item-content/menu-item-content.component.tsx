import { styles as menuItemContentStyles } from './menu-item-content.styles.js';
import { MenuItemContentProps } from './menu-item-content.types.js';

export function MenuItemContent({ icon: Icon, label }: MenuItemContentProps) {
  const styles = menuItemContentStyles();
  return (
    <div className={styles.container()}>
      <Icon aria-hidden look="outlined" size="small" />
      {label}
    </div>
  );
}
