import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex h-full items-center',
    variants: {
      size: {
        small: 'px-1.5',
        medium: 'px-2',
        large: 'px-2.5',
        xlarge: 'px-3',
      },
      position: {
        before: '',
        after: '',
      },
    },
    compoundVariants: [
      {
        position: 'before',
        size: 'small',
        className: 'pl-1.5',
      },
      {
        position: 'before',
        size: 'medium',
        className: 'pl-2',
      },
      {
        position: 'before',
        size: 'large',
        className: 'pl-2.5',
      },
      {
        position: 'before',
        size: 'xlarge',
        className: 'pl-3',
      },
      {
        position: 'after',
        size: 'small',
        className: 'pr-1.5',
      },
      {
        position: 'after',
        size: 'medium',
        className: 'pr-2',
      },
      {
        position: 'after',
        size: 'large',
        className: 'pr-2.5',
      },
      {
        position: 'after',
        size: 'xlarge',
        className: 'pr-3',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
