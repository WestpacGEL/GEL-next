import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      circle: 'relative z-10 size-[14px] border-2 bg-white transition-colors',
      circleWrapper:
        'typography-body-9 relative flex w-full cursor-pointer items-center gap-2 pb-[1.625rem] pt-1 leading-loose transition-colors ',
      stepsWrapper: 'relative transition-all',
    },
    variants: {
      firstItem: {
        true: {
          circleWrapper: 'after:first:hidden',
        },
        false: {},
      },
      state: {
        current: {
          base: 'font-bold text-primary',
          circle: 'border-primary bg-white ',
          circleWrapper: '',
        },
        visited: {
          base: '',
          circle: 'border-[3px] border-primary bg-primary',
          circleWrapper:
            'text-text before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:border-primary before:transition-colors after:absolute after:inset-y-[1.25rem] after:left-1 after:z-[1] after:block after:translate-y-[-1.25rem] after:border-l-2 after:border-primary after:transition-colors',
        },
        'non-visited': {
          base: '',
          circleWrapper: 'text-muted-90',
          circle: 'border-borderDark bg-white',
        },
        'current-visited': {
          base: '',
          circleWrapper:
            'before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:border-primary before:transition-colors',
          circle: 'border-[3px] border-primary bg-white',
        },
      },
      isFocusVisible: {
        true: { circleWrapper: 'focus-outline' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
