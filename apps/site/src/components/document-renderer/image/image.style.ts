import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'border-border-muted-soft block overflow-hidden rounded-xl border',
    caption: 'typography-site-10 mt-2 text-gel-muted',
  },
});
