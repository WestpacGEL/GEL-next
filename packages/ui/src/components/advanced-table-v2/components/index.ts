// Caption is internal-only: consumers configure it via the `caption`/`hideCaption`
// props on AdvancedTable, never by passing an AdvancedTableCaptionProps object, so
// its props type is intentionally not re-exported here.
export { AdvancedTableCaption } from './advanced-table-caption/index.js';
export { AdvancedTableEmptyState } from './advanced-table-empty-state/index.js';
export type { AdvancedTableEmptyStateProps } from './advanced-table-empty-state/index.js';
