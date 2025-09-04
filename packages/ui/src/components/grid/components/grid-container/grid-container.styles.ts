import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mx-auto box-border w-full',
  variants: {
    fixed: {
      true: 'max-w-container-xs px-4 xsl:max-w-container-xsl xsl:px-5 sm:max-w-container-sm sm:px-6 md:max-w-container-md md:px-7 lg:max-w-container-lg lg:px-10',
      false: 'px-4 xsl:px-5 sm:px-6 md:px-8 lg:px-10',
    },
  },
});
