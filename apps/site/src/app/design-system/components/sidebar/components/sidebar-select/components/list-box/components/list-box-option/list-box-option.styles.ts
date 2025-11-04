import { tv } from 'tailwind-variants';

export const styles = tv({
  base: `
    box-border flex h-10 cursor-pointer items-center justify-between border-t
    border-t-border-muted-soft bg-background-white-pale px-3 py-[0.625rem]
    transition-colors
    first:border-t-0
    hover:bg-background-white-faint
    focus:bg-background-white-faint
  `,
  variants: {
    isFocusVisible: {
      true: 'focus-outline !outline-offset-[-2px]',
      false: 'outline-none',
    },
    isSelected: {
      true: 'font-bold text-text-primary',
    },
    isDisabled: {
      true: 'text-text-muted',
    },
  },
});
