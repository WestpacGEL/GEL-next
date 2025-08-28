import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex w-full flex-col',
      label: 'block cursor-default text-left text-sm font-medium text-text',
      button:
        'relative flex h-11 cursor-pointer flex-row items-stretch overflow-hidden pl-3 pr-4 shadow-sm outline-none',
      popover: '-ml-2 w-[18.75rem]',
      iconWrapper: 'flex items-center border-l border-l-border-muted-soft pl-4 text-text-primary',
      textWrapper: 'flex flex-1 items-center pr-2',
    },
    variants: {
      isFocusVisible: {
        true: {
          button: '!outline-offset-[-2px] focus-outline',
        },
        false: {},
      },
    },
    compoundSlots: [],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
