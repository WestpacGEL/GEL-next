import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex-1 bg-background-white-pale p-4 text-text-body',
  variants: {
    look: {
      default: 'border border-border-muted-soft',
      material: '',
    },
    isFocused: {
      true: 'outline-none',
    },
  },
});
