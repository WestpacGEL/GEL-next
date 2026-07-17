import { DropDownIcon, DropLeftIcon } from '../../../icon/index.js';

import { styles as expandCellContentStyles } from './expand-cell-content.styles.js';
import { ExpandCellContentProps } from './expand-cell-content.types.js';

/** Depth-to-pixel indentation step communicating nesting under the expand column. */
const INDENT_PX = 12;
// These styles are controlled by the `.styles.ts` sheet
const BUTTON_SIZE_PX = 24;
const GAP_PX = 6;

/** Wraps the expand-hosting column's cell content with depth indentation and an expand/collapse toggle. */
export function ExpandCellContent({
  children,
  depth,
  isExpanded,
  onToggleExpanded,
  showExpandControl,
  ...ariaProps
}: ExpandCellContentProps) {
  const styles = expandCellContentStyles();
  // `missingSlothWidth` is the padding on the left of a last child of a nested row: to align with the field above
  const missingSlotWidth = BUTTON_SIZE_PX + GAP_PX - (depth > 0 ? INDENT_PX : 0);
  const paddingLeft = depth * INDENT_PX + (showExpandControl ? 0 : missingSlotWidth);

  return (
    <span className={styles.container()} style={{ paddingLeft }}>
      {showExpandControl && (
        <span className={styles.toggleSlot()}>
          <button type="button" className={styles.button()} onClick={onToggleExpanded} {...ariaProps}>
            {isExpanded ? <DropDownIcon aria-hidden size="medium" /> : <DropLeftIcon aria-hidden size="medium" />}
          </button>
        </span>
      )}
      {children}
    </span>
  );
}
