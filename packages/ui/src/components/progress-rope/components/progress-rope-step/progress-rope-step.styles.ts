import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'typography-body-10 relative flex w-full cursor-pointer items-center gap-2 pb-[0.875rem] pt-[0.5rem] leading-[1.428571429] transition-colors',
      circle: 'relative z-10 bg-white transition-colors',
    },
    variants: {
      state: {
        current: {
          base: 'font-bold text-primary',
          circle: 'border-[3px] border-primary bg-white',
        },
        visited: {
          base: 'text-text before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:border-primary before:transition-colors',
          // Can't use a const without getting tailwind errors, compound slots/variants don't work correctly for this
          // eslint-disable-next-line sonarjs/no-duplicate-string
          circle: 'border-[3px] border-primary bg-primary',
        },
        'non-visited': {
          base: 'text-muted-90',
          circle: 'border-2 border-borderDark bg-white',
        },
        'current-visited': {
          base: 'font-bold text-primary before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:border-primary before:transition-colors',
          circle: 'border-[3px] border-primary bg-primary',
        },
        'last-visited': {
          base: 'text-text after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:border-primary after:transition-colors',
          circle: 'border-[3px] border-primary bg-primary',
        },
        'last-current': {
          base: 'font-bold text-primary ',
          circle: 'border-[3px] border-primary bg-primary',
        },
      },
      firstItem: {
        true: {
          base: '',
        },
        false: {},
      },
      lastItemInGroup: {
        true: { base: 'pb-[2.75rem]' },
        false: {},
      },
      lastItemInRope: {
        true: { base: 'pt-[0.625rem]' },
        false: {},
      },
      lastItemInRopeGrouped: {
        true: { base: 'pt-[0.875rem]' },
        false: {},
      },
      furthestVisited: {
        true: { base: 'text-text', circle: 'border-[3px] border-primary bg-white' },
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
      previousStepGroup: {
        true: {
          base: 'after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:border-primary after:transition-colors',
        },
        false: {},
      },
      isFocusVisible: {
        true: { base: 'focus-outline' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
