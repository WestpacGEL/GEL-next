import { VisuallyHidden } from '../../../visually-hidden/index.js';

import { styles as advancedTableCaptionStyles } from './advanced-table-caption.styles.js';
import { AdvancedTableCaptionProps } from './advanced-table-caption.types.js';

export function AdvancedTableCaption({ title, showCaption, hasSorting, hasGrouping }: AdvancedTableCaptionProps) {
  const styles = advancedTableCaptionStyles({ showCaption });

  const hint = [hasSorting && 'Some columns are sortable.', hasGrouping && 'Rows can be grouped.']
    .filter(Boolean)
    .join(' ');

  return (
    <caption className={styles.caption()}>
      {title}
      {hint && <VisuallyHidden tag="span"> {hint}</VisuallyHidden>}
    </caption>
  );
}
