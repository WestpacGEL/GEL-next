import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border-muted-soft',
  },
  variants: {
    bordered: {
      true: { td: 'border-r last:border-r-0' },
    },
    padding: {
      default: { td: 'p-2' },
      large: { td: 'p-3' },
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});
