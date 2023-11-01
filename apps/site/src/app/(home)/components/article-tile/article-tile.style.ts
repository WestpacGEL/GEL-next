import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group flex flex-col',
    imageWrapper:
      'relative aspect-[1092/563] w-full overflow-hidden transition-[border-radius] duration-200 ease-[cubic-bezier(0.13,0.00,0.11,1.00)] group-hover:rounded-[12.5rem] group-hover:transition-[border-radius] group-hover:duration-300 group-hover:ease-[cubic-bezier(0.13,0.00,0.11,1.00)]',
    contentWrapper: 'flex grow flex-col border-gel-border pl-1 pt-4 xsl:border-r xsl:pt-7',
    title: 'typography-site-9 mb-2 font-black uppercase leading-[1.12]',
    description: 'typography-site-9 mb-2 mr-4',
    icon: 'ml-auto mt-auto block text-gel-icon xsl:mr-1',
  },
  variants: {
    layout: {
      '1x1': {
        base: 'xsl:w-6/12',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        imageWrapper: 'xsl:aspect-[1092/563]',
      },
      '1x2': '',
      '2x1': '',
      '1x1x1': {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        base: 'xsl:w-4/12',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        imageWrapper: 'xsl:aspect-[744/559]',
      },
    },
    index: {
      '0': '',
      '1': '',
      '2': '',
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      layout: '1x2',
      index: '0',
      className: 'xsl:w-4/12',
    },
    {
      slots: ['base'],
      layout: '1x2',
      index: '1',
      className: 'xsl:w-8/12',
    },
    {
      slots: ['base'],
      layout: '2x1',
      index: '0',
      className: 'xsl:w-8/12',
    },
    {
      slots: ['base'],
      layout: '2x1',
      index: '1',
      className: 'xsl:w-4/12',
    },
    {
      slots: ['imageWrapper'],
      layout: '2x1',
      index: '0',
      className: 'xsl:aspect-[478/185]',
    },
    {
      slots: ['imageWrapper'],
      layout: '2x1',
      index: '1',
      className: 'xsl:aspect-[744/559]',
    },
    {
      slots: ['imageWrapper'],
      layout: '1x2',
      index: '0',
      className: 'xsl:aspect-[744/559]',
    },
    {
      slots: ['imageWrapper'],
      layout: '1x2',
      index: '1',
      className: 'xsl:aspect-[478/185]',
    },
  ],
});
