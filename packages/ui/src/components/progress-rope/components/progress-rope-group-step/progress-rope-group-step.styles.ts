import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      circle: 'relative z-10 h-[14px] w-[14px] border-2 bg-white transition-colors',
      circleWrapper:
        'typography-body-10 relative flex h-7 cursor-pointer items-center gap-2 transition-colors before:absolute before:inset-y-0 before:left-[6px] before:block before:-translate-y-1/2 before:border-l-2 before:border-dotted before:transition-colors after:absolute after:inset-y-0 after:left-[6px] after:block after:translate-y-1/2 after:border-l-2 after:transition-colors',
      stepsWrapper: 'relative overflow-hidden transition-all',
    },
    variants: {
      firstItem: {
        true: {
          circleWrapper: 'before:hidden',
        },
        false: {},
      },
      current: {
        true: {},
        false: {},
      },
      visited: {
        true: {
          base: 'before:border-solid before:border-primary',
          circle: 'border-[3px]',
          circleWrapper: 'before:border-solid before:border-primary after:border-solid after:border-primary',
        },
        false: {
          base: 'before:border-borderDark',
          circleWrapper: 'after:border-dotted after:border-borderDark',
        },
      },
    },
    compoundVariants: [
      {
        visited: true,
        current: true,
        className: {
          base: 'font-bold text-primary',
          circle: 'border-primary bg-white',
        },
      },
      {
        visited: true,
        current: false,
        className: {
          circle: 'border-primary bg-primary',
        },
      },
      {
        visited: false,
        current: false,
        className: {
          circle: 'border-borderDark bg-white',
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
