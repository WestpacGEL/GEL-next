import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex w-full flex-col',
      label: 'block cursor-default text-left text-sm font-medium text-text',
      button:
        'relative flex cursor-pointer flex-row items-stretch overflow-hidden shadow-sm outline-none focus:focus-outline',
      // TODO: this is a workaround to align, but need to find a better way.
      popover: 'ml-[-12px] w-[250px]',
      icon: 'text-primary transition-transform',
      iconWrapper: 'border-l border-l-border px-2 py-3',
      textWrapper: 'flex flex-1 items-center p-3',
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
