import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-col border border-border text-text',
    variants: {
      rounded: {
        true: 'rounded',
      },
      lego: {
        true: 'border-0',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
