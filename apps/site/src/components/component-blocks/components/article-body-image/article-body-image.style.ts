import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      relative mb-7
      xsl:mb-9
    `,
    img: 'block w-full',
    caption: 'mt-2 typography-site-10 text-gel-muted',
  },
});
