import { tv } from 'tailwind-variants';

export const articleWrapperStyles = tv({
  base: 'xsl:grid xsl:grid-flow-row flex flex-col gap-4',
  variants: {
    layout: {
      '1x1': 'grid-cols-2',

      '1x2': 'grid-cols-3',
      '2x1': 'grid-cols-3',
      '1x1x1': 'grid-cols-3',
    },
  },
});
