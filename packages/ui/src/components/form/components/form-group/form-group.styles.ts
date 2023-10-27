import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'last:mb-0',
    variants: {
      inline: {
        true: 'sm:inline-block sm:align-middle',
        false: '',
      },
      spacing: {
        medium: 'mb-3',
        large: 'mb-4',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
