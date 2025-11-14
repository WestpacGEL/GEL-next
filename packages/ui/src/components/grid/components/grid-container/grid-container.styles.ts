export const BASE_CLASSES = 'mx-auto box-border w-full';

export const BREAKPOINT_CLASSES = {
  fixed: {
    initial: {
      true: 'max-w-xs px-4 xsl:max-w-xsl xsl:px-5 sm:max-w-sm sm:px-6 md:max-w-md md:px-7 lg:max-w-lg lg:px-10',
      false: 'px-4 xsl:px-5 sm:px-6 md:px-8 lg:px-10',
    },
    xsl: {
      true: 'xsl:max-w-xs xsl:px-4',
      false: 'xsl:px-4',
    },
    sm: {
      true: 'sm:max-w-xs sm:px-4',
      false: 'sm:px-4',
    },
    md: {
      true: 'md:max-w-xs md:px-4',
      false: 'md:px-4',
    },
    lg: {
      true: 'lg:max-w-xs lg:px-4',
      false: 'lg:px-4',
    },
    xl: {
      true: 'xl:max-w-xs xl:px-4',
      false: 'xl:px-4',
    },
  },
};
