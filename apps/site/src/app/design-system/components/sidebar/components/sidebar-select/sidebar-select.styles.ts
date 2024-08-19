import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex w-full flex-col',
      label: 'text-text block cursor-default text-left text-sm font-medium',
      button:
        'relative flex h-11 cursor-pointer flex-row items-stretch overflow-hidden pl-3 pr-4 shadow-sm outline-none',
      popover: '-ml-2 w-[18.75rem]',
      iconWrapper: 'border-l-border text-primary flex items-center border-l pl-4',
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
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
