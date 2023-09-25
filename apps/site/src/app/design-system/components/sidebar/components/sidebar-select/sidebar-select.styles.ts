import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex w-full flex-col',
      label: 'block cursor-default text-left text-sm font-medium text-text',
      button:
        'relative flex h-11 cursor-pointer flex-row items-stretch overflow-hidden pl-3 pr-4 shadow-sm outline-none focus:focus-outline',
      // TODO: this is a workaround to align, but need to find a better way.
      popover: 'ml-[-0.75rem] w-[18.75rem]',
      // icon: 'text-primary transition-transform',
      iconWrapper: 'flex items-center border-l border-l-border pl-4 text-primary',
      textWrapper: 'flex flex-1 items-center pr-2',
    },
    variants: {
      isFocusVisible: {
        true: {
          base: '',
        },
        false: {},
      },
      isOpen: {
        true: {
          icon: 'rotate-90',
        },
        false: {},
      },
    },
    compoundSlots: [],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
