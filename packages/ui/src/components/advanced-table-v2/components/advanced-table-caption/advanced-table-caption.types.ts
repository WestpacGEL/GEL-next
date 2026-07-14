export type AdvancedTableCaptionProps = {
  /** Accessible name for the table, rendered as the `<caption>` text. */
  title: string;
  /**
   * Visually hides the caption while keeping it in the accessibility tree, so the
   * table still has an accessible name for screen readers.
   * @default false
   */
  hideCaption?: boolean;
  /** When the table has sortable columns, appends a screen-reader-only hint. */
  hasSorting?: boolean;
  /** When the table has grouped rows, appends a screen-reader-only hint. */
  hasGrouping?: boolean;
};
