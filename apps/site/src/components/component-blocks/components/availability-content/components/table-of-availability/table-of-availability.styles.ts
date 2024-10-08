import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    text: 'typography-body-10',
  },
  variants: {
    color: {
      success: {
        text: 'text-success',
      },
      warning: {
        text: 'text-warning',
      },
      info: {
        text: 'text-info',
      },
      danger: {
        text: 'text-danger',
      },
    },
  },
});
