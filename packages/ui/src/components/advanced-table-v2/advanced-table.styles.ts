import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex flex-col',
    container: 'relative overflow-x-auto overflow-y-hidden rounded-md',
    table: 'border-separate border-spacing-0',
    srOnly: 'sr-only',
    overlay: 'absolute inset-0 flex items-center justify-center rounded-md bg-white/70',
  },
  variants: {
    fillContainer: {
      true: { table: 'min-w-full' },
    },
    bordered: {
      true: { table: 'border border-border-muted-soft' },
    },
    tableLayout: {
      fixed: { table: 'table-fixed' },
      auto: { table: 'table-auto' },
    },
  },
  defaultVariants: {
    fillContainer: true,
    tableLayout: 'fixed',
  },
});
