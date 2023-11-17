import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: { base: 'text-muted', iconBase: 'max-sm:h-5 max-sm:w-5 sm:h-6 sm:w-6' },
    variants: {},
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
