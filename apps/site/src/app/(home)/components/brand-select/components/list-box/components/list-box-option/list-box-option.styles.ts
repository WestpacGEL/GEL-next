import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      border-t border-t-border-muted-soft
      first:border-t-0
    `,
    link: `
      flex h-10 cursor-pointer items-center justify-between bg-white px-1
      py-[0.625rem] transition-colors
      hover:bg-background-faint
      focus:bg-background-faint
    `,
  },
  variants: {
    isFocused: {
      true: {
        link: 'bg-background-faint',
      },
    },
    isSelected: {
      true: {
        link: 'text-text-primary',
      },
    },
    isDisabled: {
      true: {
        link: 'text-text-muted',
      },
    },
  },
});
