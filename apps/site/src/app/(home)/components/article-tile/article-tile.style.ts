import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'group flex h-full flex-col',
    imageWrapper:
      'relative aspect-[1092/563] w-full overflow-hidden transition-[border-radius] duration-200 ease-[cubic-bezier(0.13,0.00,0.11,1.00)] group-hover:rounded-[12.5rem] group-hover:transition-[border-radius] group-hover:duration-300 group-hover:ease-[cubic-bezier(0.13,0.00,0.11,1.00)]',
    contentWrapper: 'flex grow flex-col border-gel-border pl-1 pt-4 xsl:border-r xsl:pt-7',
    title: 'typography-body-9 mb-2 font-black uppercase leading-[1.12]',
    description: 'typography-body-9 mb-2 mr-4',
    icon: 'ml-auto mt-auto block text-gel-icon xsl:mr-1',
  },
});
