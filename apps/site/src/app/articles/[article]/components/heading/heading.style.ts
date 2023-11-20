import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'mt-9 font-bold',
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'typography-site-5 mb-5',
      2: 'typography-site-7 mb-4 !leading-loose xsl:typography-site-6 xsl:mb-5',
      3: 'typography-site-7 mb-5',
      4: 'typography-site-9 mb-5',
      5: 'typography-site-10 mb-2',
      6: 'typography-site-10 mb-2',
    },
  },
});
