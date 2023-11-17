import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'm-0 font-normal text-muted xsl:typography-body-10 sm:typography-body-9',
    variants: {
      truncateText: {
        true: 'truncate whitespace-nowrap',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
