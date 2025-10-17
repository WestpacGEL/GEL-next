import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'overflow-visible',
  variants: {
    isSelected: {
      true: '!bg-hero',
      false: '',
    },
    isFocused: {
      true: '!bg-background !text-text !focus:border',
      false: '',
    },
  },
});
