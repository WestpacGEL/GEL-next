import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-1 flex-col gap-1 overflow-hidden',
    variants: {
      isLink: {
        true: 'group/dualaction',
      },
      isFocusVisible: {
        true: 'focus-outline',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
