import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 relative flex h-7 cursor-pointer items-center gap-2 transition-colors before:absolute before:inset-y-0 before:left-[6px] before:block before:-translate-y-1/2 before:border-l-2 before:border-dotted before:transition-colors',
      circle: 'relative z-10 bg-white transition-colors',
    },
    variants: {
      firstItem: {
        true: {
          base: 'before:first:hidden',
        },
        false: {},
      },
      size: {
        medium: {
          circle: 'h-[0.875rem] w-[0.875rem]',
        },
        small: {
          circle: 'mr-[0.25rem] h-[0.625rem] w-[0.625rem] translate-x-[0.125rem]',
          base: 'gap-4',
        },
      },
      current: {
        true: {},
        false: {},
      },
      visited: {
        true: {
          base: 'before:border-solid before:border-primary',
        },
        false: {
          base: 'before:border-borderDark',
        },
      },
    },
    compoundVariants: [
      {
        visited: true,
        current: true,
        className: {
          base: 'font-bold text-primary',
          circle: 'border-[3px] border-primary bg-white',
        },
      },
      {
        visited: true,
        current: false,
        className: {
          circle: 'border-[3px] border-primary bg-primary',
        },
      },
      {
        visited: false,
        current: false,
        className: {
          circle: 'border-2 border-borderDark bg-white',
        },
      },
      {
        visited: false,
        current: true,
        className: {
          circle: 'border-primary bg-white',
        },
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
