import { DropDownIcon, DropLeftIcon } from '../../../icon/index.js';

import { styles as advancedTableExpandCellContentStyles } from './advanced-table-expand-cell-content.styles.js';
import { AdvancedTableExpandCellContentProps } from './advanced-table-expand-cell-content.types.js';

/** Depth-to-pixel indentation step communicating nesting under the expand column. */
const INDENT_PX = 12;
// These styles are controlled by the `.styles.ts` sheet
const BUTTON_SIZE_PX = 24;
const GAP_PX = 6;

/** Wraps the expand-hosting column's cell content with depth indentation and an expand/collapse toggle. */
export function AdvancedTableExpandCellContent({
  children,
  depth,
  isExpanded,
  onToggleExpanded,
  showExpandControl,
  ...ariaProps
}: AdvancedTableExpandCellContentProps) {
  const styles = advancedTableExpandCellContentStyles();
  // `missingSlothWidth` is the padding on the left of a last child of a nested row: to left align with the field above
  const missingSlotWidth = BUTTON_SIZE_PX + GAP_PX - (depth > 0 ? INDENT_PX : 0);
  const paddingLeft = depth * INDENT_PX + (showExpandControl ? 0 : missingSlotWidth);

  return (
    <span className={styles.container()} style={{ paddingLeft }}>
      {showExpandControl && (
        <span className={styles.toggleSlot()}>
          <button className={styles.button()} onClick={onToggleExpanded} type="button" {...ariaProps}>
            {isExpanded ? <DropDownIcon aria-hidden size="medium" /> : <DropLeftIcon aria-hidden size="medium" />}
          </button>
        </span>
      )}
      {children}
    </span>
  );
}
