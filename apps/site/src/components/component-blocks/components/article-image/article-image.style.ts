import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'block',
    caption: 'typography-site-10 text-gel-muted mt-2',
  },
  variants: {
    spacing: {
      default: {
        base: 'xsl:mb-9 mb-7 group-[&]:mb-4',
      },
      reduced: {
        base: 'xsl:mb-5 mb-4',
      },
    },
  },
});
