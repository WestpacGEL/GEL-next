import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    text: 'typography-body-10',
  },
  variants: {
    color: {
      success: {
        text: 'text-text-success',
      },
      warning: {
        text: 'text-text-warning',
      },
      info: {
        text: 'text-text-info',
      },
      danger: {
        text: 'text-text-danger',
      },
    },
  },
});
