import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex-1 bg-background-white-pale p-4 text-text-body [&_:focus-visible]:focus-outline',
  variants: {
    look: {
      default: 'border border-border-muted-soft',
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
