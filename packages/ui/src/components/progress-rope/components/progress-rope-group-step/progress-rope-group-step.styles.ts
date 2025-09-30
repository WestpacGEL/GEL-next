import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: '',
    circle: 'bg-background-white-pale relative z-10 size-[14px] border-2 transition-colors',
    circleWrapper:
      'typography-body-9 relative flex w-full cursor-pointer items-center gap-2 pt-1 pb-[1.625rem] leading-loose transition-colors ',
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
        base: 'text-text-primary font-bold',
        circle: 'border-border-primary bg-background-white-pale',
        circleWrapper: '',
      },
      visited: {
        base: '',
        circle: 'border-border-primary bg-surface-primary border-[3px]',
        circleWrapper:
          'text-text-body before:border-border-primary after:border-border-primary before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors after:absolute after:inset-y-[1.25rem] after:left-1 after:z-[1] after:block after:translate-y-[-1.25rem] after:border-l-2 after:transition-colors',
      },
      'non-visited': {
        base: '',
        circleWrapper: 'text-text-muted/90',
        circle: 'border-border-muted-strong bg-background-white-pale',
      },
      'current-visited': {
        base: '',
        circleWrapper:
          'text-text-body before:border-border-primary before:absolute before:inset-y-0 before:left-1 before:z-[1] before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        circle: 'border-border-primary bg-background-white-pale border-[3px]',
      },
    },
    isFocusVisible: {
      true: { circleWrapper: 'focus-outline' },
    },
  },
});
