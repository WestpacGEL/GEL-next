import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex size-5 flex-col items-center justify-center overflow-hidden rounded-full bg-background',
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
