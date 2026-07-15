import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // Wraps the scroll region + pagination so pagination sits outside the
    // table's horizontal-scroll area.
    root: 'flex flex-col',
    // overflow-hidden/rounded-md live here, not on <table>: sticky (pinning)
    // binds to the nearest clipping ancestor, so putting it on the table would
    // make pinned cells stick to the table instead of this scroll container.
    container: 'overflow-x-auto overflow-y-hidden rounded-md',
    // table-layout: fixed + a <colgroup> (column.getSize()) give every column a
    // real, enforced width — auto layout only treats per-cell widths as hints
    // and can silently redistribute them, which breaks pinning's sticky offsets.
    // The table's own width is inline (`table.getTotalSize()`), not a class.
    table: 'table-fixed border-separate border-spacing-0',
    srOnly: 'sr-only',
  },
  variants: {
    fillContainer: {
      // Paired with the inline width: min-width stretches to fill a wider
      // container without ever shrinking columns below their nominal total.
      true: { table: 'min-w-full' },
    },
    bordered: {
      true: { table: 'border border-border-muted-soft' },
    },
  },
  defaultVariants: {
    fillContainer: true,
  },
});
