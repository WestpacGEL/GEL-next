import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    td: 'border-b border-border-muted-soft',
  },
  variants: {
    padding: {
      default: { td: 'p-2' },
      large: { td: 'p-3' },
    },
    bordered: {
      true: { td: 'border-r last:border-r-0' },
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});
