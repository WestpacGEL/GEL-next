import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'block overflow-hidden rounded-xl border border-border-muted-soft',
    caption: 'typography-site-10 mt-2 text-gel-muted',
  },
});
