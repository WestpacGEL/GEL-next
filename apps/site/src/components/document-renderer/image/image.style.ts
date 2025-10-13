import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'border-border-muted-soft block overflow-hidden rounded-3xl border',
    caption: 'typography-site-10 text-gel-muted mt-2',
  },
});
