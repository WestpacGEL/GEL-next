import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex w-full flex-col',
    label: 'text-text block cursor-default text-left text-sm font-medium',
    button: 'relative flex h-11 cursor-pointer flex-row items-stretch overflow-hidden pr-4 pl-3',
    popover: '-ml-2 w-[18.75rem]',
    iconWrapper: 'border-l-border-muted-soft text-text-primary flex items-center border-l pl-4',
    textWrapper: 'flex flex-1 items-center pr-2',
  },
  variants: {
    isFocusVisible: {
      true: {
        button: 'focus-outline !outline-offset-[-2px]',
      },
      false: {},
    },
  },
  compoundSlots: [],
});
