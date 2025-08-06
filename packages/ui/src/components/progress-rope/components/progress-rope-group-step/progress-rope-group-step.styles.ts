import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: '',
      circle: 'relative z-10 size-[14px] border-2 bg-surface-white-pale transition-colors',
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
          base: 'font-bold text-text-primary',
          circle: 'border-border-primary bg-surface-white-pale',
          circleWrapper: '',
        },
        visited: {
          base: '',
          circle: 'border-[3px] border-border-primary bg-surface-primary',
          circleWrapper:
            'text-text-body before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:border-border-primary before:transition-colors after:absolute after:inset-y-[1.25rem] after:left-1 after:z-[1] after:block after:translate-y-[-1.25rem] after:border-l-2 after:border-border-primary after:transition-colors',
        },
        'non-visited': {
          base: '',
          circleWrapper: 'text-text-muted/90',
          circle: 'border-border-muted-strong bg-surface-white-pale',
        },
        'current-visited': {
          base: '',
          circleWrapper:
            'text-text-body before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:border-border-primary before:transition-colors',
          circle: 'border-[3px] border-border-primary bg-surface-white-pale',
        },
      },
      isFocusVisible: {
        true: { circleWrapper: 'focus-outline' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
