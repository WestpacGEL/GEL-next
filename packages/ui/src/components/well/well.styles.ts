import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'rounded-2xl border border-border-muted-soft p-2 text-text-body sm:p-4 [&_:focus-visible]:focus-outline',
  variants: {
    color: {
      light: 'bg-surface-muted-faint',
      white: 'bg-background-white',
    },
  },
});
