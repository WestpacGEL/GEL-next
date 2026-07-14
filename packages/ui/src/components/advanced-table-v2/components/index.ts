// Sub-component prop types (cell/row/header) are internal — they carry TanStack
// types and are consumed only within their own folder, so they are intentionally
// not re-exported through this barrel (as with the caption props type below).
export { AdvancedTableBody } from './advanced-table-body/index.js';
// Caption is internal-only: consumers configure it via the `caption`/`hideCaption`
// props on AdvancedTable, never by passing an AdvancedTableCaptionProps object, so
// its props type is intentionally not re-exported here.
export { AdvancedTableCaption } from './advanced-table-caption/index.js';
export { AdvancedTableCell } from './advanced-table-cell/index.js';
export { AdvancedTableEmptyState } from './advanced-table-empty-state/index.js';
export type { AdvancedTableEmptyStateProps } from './advanced-table-empty-state/index.js';
export { AdvancedTableHead } from './advanced-table-head/index.js';
export { AdvancedTableRow } from './advanced-table-row/index.js';
