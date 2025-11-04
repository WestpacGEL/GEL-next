import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative',
    img: 'block overflow-hidden rounded-3xl border border-border-muted-soft',
    caption: 'mt-2 typography-site-10 text-gel-muted',
  },
});
