import { tv } from 'tailwind-variants';

export const styles = tv({
  variants: {
    type: {
      default: `
        typography-body-8
        sm:typography-body-7
      `,
      graphik: `
        typography-site-8
        sm:typography-site-7
      `,
    },
  },
  base: 'mb-6 !leading-10 font-normal',
});
