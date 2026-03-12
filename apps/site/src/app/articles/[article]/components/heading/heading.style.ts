import { tv } from 'tailwind-variants';

export const styles = tv({
  base: `
    col-span-12 font-bold
    xsl:col-span-10 xsl:col-start-2
    md:col-span-8 md:col-start-3
  `,
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      end: 'text-right',
    },
    level: {
      1: 'typography-site-5',
      2: `
        mb-4 typography-site-7 leading-[1.3]
        xsl:mb-5 xsl:typography-site-6 xsl:leading-[1.3]
      `,
      3: `
        mb-3 typography-site-8 leading-[1.3]
        xsl:typography-site-7 xsl:leading-[1.3]
      `,
      4: 'mb-3 typography-site-8 leading-[1.3]',
      5: 'typography-site-10',
      6: 'typography-site-10',
    },
  },
});
