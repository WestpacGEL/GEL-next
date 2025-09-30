import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'typography-body-11 text-text-muted mb-2',
  variants: {
    spacing: {
      medium: '-mt-1 mb-2',
      large: '-mt-2 mb-3',
    },
  },
});
