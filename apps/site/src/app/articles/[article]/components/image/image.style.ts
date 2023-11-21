import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative mx-0 my-4 only:my-0',
    img: 'block',
    caption: 'typography-site-10 mt-2 text-gel-muted',
  },
});
