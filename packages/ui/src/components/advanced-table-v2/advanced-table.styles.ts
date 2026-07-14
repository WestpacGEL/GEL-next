import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
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
