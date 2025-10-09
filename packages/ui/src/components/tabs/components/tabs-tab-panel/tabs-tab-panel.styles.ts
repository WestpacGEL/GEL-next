import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'bg-background-white-pale text-text-body flex-1 p-4',
  variants: {
    look: {
      default: 'border-border-muted-soft border',
      material: '',
    },
    isFocused: {
      true: 'outline-none',
    },
    justify: {
      false: 'rounded-tr-2xl',
    },
    orientation: {
      vertical: 'rounded-r-2xl',
      horizontal: 'rounded-b-2xl',
    },
  },
});
