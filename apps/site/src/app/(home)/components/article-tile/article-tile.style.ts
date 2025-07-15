import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group flex flex-col focus-visible:focus-outline',
    imageWrapper:
      'relative aspect-[1092/563] w-full overflow-hidden transition-[border-radius] duration-200 ease-[cubic-bezier(0.13,0.00,0.11,1.00)] group-hover:rounded-[12.5rem] group-hover:transition-[border-radius] group-hover:duration-300 group-hover:ease-[cubic-bezier(0.13,0.00,0.11,1.00)]',
    contentWrapper: 'flex grow flex-col border-gel-border pl-1 pt-4 xsl:border-r xsl:pt-6.5',
    title: 'typography-site-9 mb-2 font-black uppercase leading-[1.12]',
    description: 'typography-site-9 mb-2 mr-4 leading-[1.5]',
    icon: 'ml-auto mt-auto block text-gel-icon xsl:mr-1',
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
