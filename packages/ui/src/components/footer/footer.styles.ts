import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative overflow-hidden border-t-2 border-t-primary',
      wrapper: 'pt-3 max-md:px-2 max-md:pb-3 md:px-4 md:pb-4',
      topRow: 'max-md:mb-7 md:mb-4',
      link: 'float-right block',
    },
    variants: {
      offsetSidebar: {
        true: {
          base: 'lg:mr-[300px]',
        },
        false: {},
      },
      isFocusVisible: {
        true: { link: 'focus-outline' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
