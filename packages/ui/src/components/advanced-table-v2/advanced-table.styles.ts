import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // Wraps the scroll region + pagination so pagination controls sit outside the
    // table's horizontal-scroll area rather than scrolling with wide tables.
    root: 'flex flex-col',
    container: 'overflow-x-auto',
    table: 'border-separate border-spacing-0 overflow-hidden rounded-md',
    srOnly: 'sr-only',
  },
  variants: {
    fillContainer: {
      true: { table: 'w-full' },
      false: { table: 'w-auto' },
    },
    bordered: {
      true: { table: 'border border-border-muted-soft' },
    },
  },
  defaultVariants: {
    fillContainer: true,
  },
});
