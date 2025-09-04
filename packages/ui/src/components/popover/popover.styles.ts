import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative inline-block',
    button: '',
  },
  variants: {
    linkStyling: {
      true: {
        button: 'p-0',
      },
      false: {},
    },
  },
});
