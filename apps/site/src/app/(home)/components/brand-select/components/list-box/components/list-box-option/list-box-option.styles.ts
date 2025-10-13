import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border-t-border-muted-soft border-t first:border-t-0',
    link: 'hover:bg-light focus:bg-light flex h-10 cursor-pointer items-center justify-between bg-white px-1 py-[0.625rem] transition-colors',
  },
  variants: {
    isFocused: {
      true: {
        link: 'bg-light',
      },
    },
    isSelected: {
      true: {
        link: 'text-primary',
      },
    },
    isDisabled: {
      true: {
        link: 'text-muted',
      },
    },
  },
});
