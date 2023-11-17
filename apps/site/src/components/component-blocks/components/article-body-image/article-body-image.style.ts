import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative mx-0 my-7 xsl:my-9 md:-mx-17',
    img: 'block w-full',
    caption: 'typography-site-10 mt-2 text-gel-muted',
  },
});
