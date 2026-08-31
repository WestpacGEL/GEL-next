import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    circle: 'relative z-10 size-[14px] border-2 bg-background-white transition-colors',
    circleWrapper:
      'relative flex w-full cursor-pointer items-center gap-2 pt-1 pb-[1.625rem] typography-body-9 leading-loose outline-transparent transition-colors',
    icon: 'text-text-primary',
    label: 'flex items-center gap-1',
    stepsWrapper: 'relative transition-all',
  },
  variants: {
    variant: {
      progress: {},
      status: {
        circle: 'cursor-pointer',
        circleWrapper: 'h-[3rem] cursor-default py-0 typography-body-9 text-text-body',
        label: 'cursor-pointer',
      },
    },
    firstItem: {
      true: {
        circleWrapper: 'after:!hidden',
      },
      false: {},
    },
    state: {
      current: {
        base: '',
        circle: 'bg-background-white',
        circleWrapper: '',
      },
      visited: {
        base: '',
        circle: 'border-[3px]',
        circleWrapper:
          'before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors after:absolute after:inset-y-[1.25rem] after:left-1 after:z-[1] after:block after:translate-y-[-1.25rem] after:border-l-2 after:transition-colors',
      },
      'non-visited': {
        base: '',
        circleWrapper: '',
        circle: 'bg-background-white',
      },
      'current-visited': {
        base: '',
        circleWrapper:
          'before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        circle: 'border-[3px] bg-background-white',
      },
    },
    isFocusVisible: {
      true: { circleWrapper: '!focus-outline' },
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      variant: 'progress',
      state: 'current',
      className: 'font-bold text-text-primary',
    },
    {
      slots: ['circle'],
      variant: 'progress',
      state: ['current', 'current-visited'],
      className: 'border-border-primary',
    },
    {
      slots: ['circle'],
      variant: 'progress',
      state: 'visited',
      className: 'border-border-primary bg-surface-primary',
    },
    {
      slots: ['circleWrapper'],
      variant: 'progress',
      state: 'visited',
      className: 'before:border-border-primary after:border-border-primary',
    },
    {
      slots: ['circleWrapper'],
      variant: 'progress',
      state: 'current-visited',
      className: 'before:border-border-primary',
    },
    {
      slots: ['base'],
      variant: 'status',
      state: 'current',
      className: 'text-text-body',
    },
    {
      slots: ['circle'],
      variant: 'status',
      state: ['current', 'current-visited'],
      className: 'border-border-hero',
    },
    {
      slots: ['circle'],
      variant: 'status',
      state: 'visited',
      className: 'border-border-hero bg-surface-hero',
    },
    {
      slots: ['circleWrapper'],
      variant: 'status',
      state: 'visited',
      className: 'before:border-border-hero after:border-border-hero',
    },
    {
      slots: ['circleWrapper'],
      variant: 'status',
      state: 'current-visited',
      className: 'before:border-border-hero',
    },
    {
      slots: ['circleWrapper'],
      variant: ['progress', 'status'],
      state: ['visited', 'current-visited'],
      className: 'text-text-body',
    },
    {
      slots: ['circleWrapper'],
      variant: 'progress',
      state: 'non-visited',
      className: 'text-text-muted/90',
    },
    {
      slots: ['circle'],
      variant: ['progress', 'status'],
      state: 'non-visited',
      className: 'border-border-muted-strong',
    },
  ],
});
