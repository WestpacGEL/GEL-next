import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group focus-visible:focus-outline flex flex-col',
    imageWrapper:
      'relative aspect-[1092/563] w-full overflow-hidden transition-[border-radius] duration-200 ease-[cubic-bezier(0.13,0.00,0.11,1.00)] group-hover:rounded-[12.5rem] group-hover:transition-[border-radius] group-hover:duration-300 group-hover:ease-[cubic-bezier(0.13,0.00,0.11,1.00)]',
    contentWrapper: 'border-gel-border xsl:border-r xsl:pt-6.5 flex grow flex-col pt-4 pl-1',
    title: 'typography-site-9 mb-2 leading-[1.12] font-black uppercase',
    description: 'typography-site-9 mr-4 mb-2 leading-[1.5]',
    icon: 'text-gel-icon xsl:mr-1 mt-auto ml-auto block',
  },
  variants: {
    layout: {
      '1x1': {
        imageWrapper: 'xsl:aspect-[1092/563]',
      },
      '1x2': {},
      '2x1': {},
      '1x1x1': {
        imageWrapper: 'xsl:aspect-[708/559]',
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
      index: '1',
      className: 'xsl:col-span-2',
    },
    {
      slots: ['base'],
      layout: '2x1',
      index: '0',
      className: 'xsl:col-span-2',
    },
    {
      slots: ['imageWrapper'],
      layout: '2x1',
      index: '0',
      className: 'xsl:aspect-[484/185]',
    },
    {
      slots: ['imageWrapper'],
      layout: '2x1',
      index: '1',
      className: 'xsl:aspect-[708/559]',
    },
    {
      slots: ['imageWrapper'],
      layout: '1x2',
      index: '0',
      className: 'xsl:aspect-[708/559]',
    },
    {
      slots: ['imageWrapper'],
      layout: '1x2',
      index: '1',
      className: 'xsl:aspect-[484/185]',
    },
  ],
});
