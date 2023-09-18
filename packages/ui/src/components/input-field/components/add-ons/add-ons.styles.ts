import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'inset-y-0',
    variants: {
      isInset: {
        true: 'absolute',
        false: '',
      },
      position: {
        before: 'add-on-before group',
        after: 'add-on-after group',
      },
    },
    compoundVariants: [
      {
        isInset: true,
        position: 'before',
        className: 'left-0',
      },
      {
        isInset: true,
        position: 'after',
        className: 'right-0',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
