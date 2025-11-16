import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative overflow-hidden border-t border-t-border [&_:focus-visible]:focus-outline',
      wrapper: 'pt-3 max-md:px-2 max-md:pb-3 md:px-4 md:pb-3',
      link: 'float-right block',
      logoWrapper: 'flex justify-end',
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
