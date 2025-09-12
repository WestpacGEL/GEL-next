import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'relative border-t border-t-border-muted-soft first:border-t-0 [&:not(:first-of-type)]:pt-5 md:[&:not(:first-of-type)]:pt-6 [&:not(:last-child)]:pb-1',
  variants: {
    noPadding: {
      true: '',
      false: 'px-0 sm:px-9 md:px-[2.875rem] lg:px-[3.125rem]',
    },
  },
});
