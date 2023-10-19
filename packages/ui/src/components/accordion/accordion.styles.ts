import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'text-text border-border flex flex-col border',
    variants: {
      rounded: {
        true: 'overflow-hidden rounded',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
