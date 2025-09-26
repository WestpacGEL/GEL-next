import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'border-border-muted-soft text-text-body flex flex-col border',
  variants: {
    rounded: {
      true: 'rounded-2xl',
    },
  },
});
