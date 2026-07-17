export type AdvancedTableCaptionProps = {
  /** Accessible name for the table, rendered as the `<caption>` text. */
  title: string;
  /**
   * Visually shows the caption. When `false`, the caption is still rendered
   * but is visually and announced for screen readers.
   * @default false
   */
  showCaption?: boolean;
  /** When the table has sortable columns, appends a screen-reader-only hint. */
  hasSorting?: boolean;
  /** When the table has grouped rows, appends a screen-reader-only hint. */
  hasGrouping?: boolean;
};
