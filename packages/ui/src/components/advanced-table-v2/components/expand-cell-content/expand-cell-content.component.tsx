import { DropDownIcon, DropLeftIcon } from '../../../icon/index.js';

import { styles as expandCellContentStyles } from './expand-cell-content.styles.js';
import { ExpandCellContentProps } from './expand-cell-content.types.js';

/** Depth-to-pixel indentation step communicating nesting under the expand column. */
const INDENT_PX = 20;

/** Wraps the expand-hosting column's cell content with depth indentation and an expand/collapse toggle. */
export function ExpandCellContent({
  depth,
  showExpandControl,
  isExpanded,
  onToggleExpanded,
  children,
  ...ariaProps
}: ExpandCellContentProps) {
  const styles = expandCellContentStyles();

  return (
    <span className={styles.container()} style={{ paddingLeft: depth * INDENT_PX }}>
      <span className={styles.toggleSlot()}>
        {showExpandControl && (
          <button type="button" className={styles.button()} onClick={onToggleExpanded} {...ariaProps}>
            {isExpanded ? <DropDownIcon aria-hidden size="small" /> : <DropLeftIcon aria-hidden size="small" />}
          </button>
        )}
      </span>
      {children}
    </span>
  );
}
