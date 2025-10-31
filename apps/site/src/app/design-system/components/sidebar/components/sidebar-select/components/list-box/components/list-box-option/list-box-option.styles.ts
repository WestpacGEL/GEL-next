import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'border-t-border-muted-soft bg-background-white-pale hover:bg-background-white-faint focus:bg-background-white-faint box-border flex h-10 cursor-pointer items-center justify-between border-t px-3 py-[0.625rem] transition-colors first:border-t-0',
  variants: {
    isFocusVisible: {
      true: 'focus-outline !outline-offset-[-2px]',
      false: 'outline-none',
    },
    isSelected: {
      true: 'text-text-primary font-bold',
    },
    isDisabled: {
      true: 'text-muted',
    },
  },
});
