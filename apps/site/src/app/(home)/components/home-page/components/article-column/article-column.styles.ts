import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'w-full',
  variants: {
    layout: {
      '1x1': 'xsl:w-6/12',
      '1x2': '',
      '2x1': '',
      // eslint-disable-next-line sonarjs/no-duplicate-string
      '1x1x1': 'xsl:w-4/12',
    },
    index: {
      0: '',
      1: '',
      2: '',
    },
  },
  compoundVariants: [
    {
      layout: '1x2',
      index: 0,
      className: 'xsl:w-4/12',
    },
    {
      layout: '1x2',
      index: 1,
      className: 'xsl:w-8/12',
    },
    {
      layout: '2x1',
      index: 0,
      className: 'xsl:w-8/12',
    },
    {
      layout: '2x1',
      index: 1,
      className: 'xsl:w-4/12',
    },
  ],
});
