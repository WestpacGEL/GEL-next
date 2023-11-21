import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative -mx-4 flex flex-col px-4 xsl:-mx-5 xsl:px-5',
      label: 'block cursor-default text-left text-sm font-medium text-text',
      button:
        'relative flex h-11 max-w-full cursor-pointer flex-row items-stretch overflow-hidden pt-1.5 outline-none focus:focus-outline',
      // TODO: this is a workaround to align, but need to find a better way.
      popover: 'w-full',
      // icon: 'text-primary transition-transform',
      iconWrapper: 'pointer-events-none mb-[-0.4rem] flex flex-shrink-0 touch-none items-center text-primary',
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
