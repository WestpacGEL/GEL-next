import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'xsl:mb-4 mb-3 w-full leading-[2] last:mb-0',
  variants: {
    textAlign: {
      center: 'text-center',
      end: 'text-right',
    },
    type: {
      default: 'typography-body-9',
      graphik:
        'typography-site-9 xsl:col-span-10 xsl:col-start-2 xsl:mb-9 col-span-12 mb-7 leading-[2] md:col-span-8 md:col-start-3 [&:has(+_p,_+_ul,_+_ol)]:mb-2',
    },
  },
});
