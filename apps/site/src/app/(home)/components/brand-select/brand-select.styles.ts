import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex w-full flex-col',
      label: 'block cursor-default text-left text-sm font-medium text-text',
      button:
        'relative flex h-11 max-w-full cursor-pointer flex-row items-stretch overflow-hidden pt-1.5 outline-none focus:focus-outline',
      // TODO: this is a workaround to align, but need to find a better way.
      popover: 'ml-[-0.75rem] w-full',
      // icon: 'text-primary transition-transform',
      iconWrapper: 'flex flex-shrink-0 items-center text-primary',
      textWrapper: 'flex flex-shrink items-center overflow-hidden pr-2',
    },
    variants: {
      isFocusVisible: {
        true: {
          base: 'focus-outline',
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
