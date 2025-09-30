import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'border-border-muted-soft text-text-body rounded-2xl border p-2 sm:p-4',
  variants: {
    color: {
      light: 'bg-surface-muted-faint',
      white: 'bg-background-white-pale',
    },
  },
});
