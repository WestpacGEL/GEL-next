import { tv } from 'tailwind-variants';

export const styles = tv({
  base: '',
  variants: {
    inline: {
      true: 'sm:inline-block sm:align-middle',
      false: '',
    },
    spacing: {
      none: '',
      medium: 'mb-3',
      large: 'mb-4',
    },
  },
});
