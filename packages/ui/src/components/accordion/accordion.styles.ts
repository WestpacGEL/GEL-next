import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex flex-col border border-border-muted-soft text-text-body',
    variants: {
      rounded: {
        true: 'overflow-hidden rounded',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
