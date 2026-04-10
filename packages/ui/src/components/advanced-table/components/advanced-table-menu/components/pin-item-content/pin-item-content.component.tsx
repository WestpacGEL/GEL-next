import { PinIcon, UnpinIcon } from '../../../../../icon/index.js';

import { styles as pinItemContentStyles } from './pin-item-content.styles.js';
import { PinItemContentProps } from './pin-item-content.types.js';

export function PinItemContent({ isPinned, direction }: PinItemContentProps) {
  const Icon = isPinned ? UnpinIcon : PinIcon;
  const label = isPinned ? `Unpin ${direction}` : `Pin ${direction}`;
  const styles = pinItemContentStyles();
  return (
    <div className={styles.container()}>
      <Icon size="small" look="outlined" />
      {label}
    </div>
  );
}
