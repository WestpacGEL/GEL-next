import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'mx-auto box-border w-full max-w-container px-2 xsl:px-5 sm:px-6 md:px-8 lg:px-10',
    variants: {
      fixed: {
        true: 'sm:max-w-xsl md:max-w-md lg:max-w-lg',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
