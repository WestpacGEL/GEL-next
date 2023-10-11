import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-10 m-0 font-normal text-muted xsl:typography-body-9',
    variants: {
      truncateText: {
        true: 'truncate',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
