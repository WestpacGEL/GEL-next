import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-col border border-border text-text',
    variants: {
      rounded: {
        true: 'overflow-hidden rounded-[0.1875rem]',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
