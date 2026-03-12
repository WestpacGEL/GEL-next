import { tv } from 'tailwind-variants';

export const articleWrapperStyles = tv({
  base: `
    flex flex-col gap-4
    xsl:grid xsl:grid-flow-row
  `,
  variants: {
    layout: {
      '1x1': 'grid-cols-2',

      '1x2': 'grid-cols-3',
      '2x1': 'grid-cols-3',
      '1x1x1': 'grid-cols-3',
    },
  },
});
