import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mx-auto box-border w-full',
  variants: {
    fixed: {
      true: 'xsl:max-w-xsl xsl:px-5 max-w-xs px-4 sm:max-w-sm sm:px-6 md:max-w-md md:px-7 lg:max-w-lg lg:px-10',
      false: 'xsl:px-5 px-4 sm:px-6 md:px-8 lg:px-10',
    },
  },
});
