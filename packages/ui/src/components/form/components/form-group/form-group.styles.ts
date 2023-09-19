import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: '',
    variants: {
      inline: {
        true: 'sm:inline-block sm:align-middle',
        false: '',
      },
      spacing: {
        small: 'mb-3',
        medium: 'mb-3',
        large: 'mb-4',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
