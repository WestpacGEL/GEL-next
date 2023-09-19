import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-10 mb-2 text-muted',
    variants: {
      spacing: {
        medium: '-mt-1 mb-2',
        large: '-mt-2 mb-3',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
