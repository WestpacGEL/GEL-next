import { PinIcon, UnpinIcon } from '../../../icon/index.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as rowPinToggleStyles } from './advanced-table-row-pin-toggle.styles.js';
import { AdvancedTableRowPinToggleProps } from './advanced-table-row-pin-toggle.types.js';

// Pin toggle button rendered in the reserved pin column (depth-0 rows only).
export function AdvancedTableRowPinToggle<T>({ row, table }: AdvancedTableRowPinToggleProps<T>) {
  const { onRowPinAnnouncement } = useAdvancedTableContext<T>();
  const isPinned = row.getIsPinned() === 'top';
  // Use overall position, not page-relative, so the label stays stable across pages.
  // Announcement falls back to row.index if the row's been filtered out of the row model entirely.
  const visibleIndex = table.getPrePaginationRowModel().rows.indexOf(row);
  const displayIndex = visibleIndex === -1 ? row.index : visibleIndex;
  const label = `${isPinned ? 'Unpin' : 'Pin'} row ${displayIndex + 1}`;
  const styles = rowPinToggleStyles();
  const Icon = isPinned ? UnpinIcon : PinIcon;

  return (
    <button
      type="button"
      className={styles.button()}
      onClick={() => {
        row.pin(isPinned ? false : 'top', true);
        onRowPinAnnouncement?.(`Row ${displayIndex + 1} ${isPinned ? 'unpinned' : 'pinned'}.`);
      }}
      aria-label={label}
    >
      <Icon aria-hidden size="small" look="outlined" />
    </button>
  );
}
