import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'mx-auto box-border w-full',
    variants: {
      fixed: {
        true: 'max-w-container-xs xsl:max-w-container-xsl sm:max-w-container-sm md:max-w-container-md lg:max-w-container-lg px-4 xsl:px-5 sm:px-6 md:px-7 lg:px-10',
        false: 'px-4 xsl:px-5 sm:px-6 md:px-8 lg:px-10',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
