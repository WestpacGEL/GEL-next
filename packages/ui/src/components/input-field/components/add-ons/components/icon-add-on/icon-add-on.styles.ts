import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex h-full items-center',
    variants: {
      size: {
        small: 'px-[0.5625rem]', //'0.5625rem',
        medium: 'px-2', //'0.75rem',
        large: 'px-[0.9375rem]', //'0.9375rem',
        xlarge: 'px-3', //'1.125rem',
      },
      position: {
        before: '',
        after: '',
      },
    },
    compoundVariants: [
      {
        position: 'before',
        size: 'small', //'0.5625rem',,
        className: 'pl-[0.5625rem]',
      },
      {
        position: 'before',
        size: 'medium', //'0.75rem',,
        className: 'pl-2',
      },
      {
        position: 'before',
        size: 'large', //'0.9375rem',,
        className: 'pl-[0.9375rem]',
      },
      {
        position: 'before',
        size: 'xlarge', //'1.125rem',,
        className: 'pl-3',
      },
      {
        position: 'after',
        size: 'small', //'0.5625rem',,
        className: 'pr-[0.5625rem]',
      },
      {
        position: 'after',
        size: 'medium', //'0.75rem',,
        className: 'pr-2',
      },
      {
        position: 'after',
        size: 'large', //'0.9375rem',,
        className: 'pr-[0.9375rem]',
      },
      {
        position: 'after',
        size: 'xlarge', //'1.125rem',,
        className: 'pr-3',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
