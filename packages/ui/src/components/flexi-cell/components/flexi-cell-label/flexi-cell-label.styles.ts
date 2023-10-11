import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 m-0 font-normal text-text transition-colors xsl:typography-body-8 group-hover:text-link',
    variants: {
      truncateText: {
        true: 'truncate',
        false: '',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
