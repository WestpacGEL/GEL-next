import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'w-full p-0 leading-[2] last:mb-0',
    li: 'relative mb-2 leading-7',
  },
  variants: {
    color: {
      default: {
        li: 'text-text-body before:bg-surface-hero',
      },
      blue: {
        li: 'before:bg-gel-icon',
      },
    },
    type: {
      ordered: {
        base: 'list-decimal ps-[1.25rem]',
        li: 'last:mb-0',
      },
      unordered: {
        base: '',
        li: 'pl-[1.1875rem] leading-[2] before:absolute before:top-[0.7rem] before:left-0.5 before:block before:size-1.5 before:rounded-full last:mb-0',
      },
    },
    fontFamily: {
      default: {
        base: 'my-4',
        li: 'typography-body-9',
      },
      graphik: {
        base: 'xsl:col-span-10 xsl:col-start-2 xsl:mb-9 col-span-12 mb-7 md:col-span-8 md:col-start-3 [&:has(+_p)]:mb-7',
        li: 'typography-site-9',
      },
    },
  },
});
