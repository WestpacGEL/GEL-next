import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'block',
    caption: 'typography-site-10 mt-2 text-gel-muted',
  },
  variants: {
    spacing: {
      default: {
        base: 'mb-7 group-[&]:mb-4 xsl:mb-9',
      },
      reduced: {
        base: 'mb-4 xsl:mb-5',
      },
    },
  },
});
