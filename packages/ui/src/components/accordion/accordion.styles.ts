import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex flex-col border border-border-muted-soft text-text-body',
  variants: {
    rounded: {
      true: 'rounded-2xl',
    },
    look: {
      lego: 'border-0 border-b',
      soft: '',
    },
  },
});
