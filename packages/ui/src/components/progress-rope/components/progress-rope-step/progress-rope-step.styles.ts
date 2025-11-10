import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex w-full cursor-pointer items-center gap-2 pt-[0.5rem] pb-[0.875rem] typography-body-10 leading-loose outline-transparent transition-colors',
    circle: 'relative z-10 bg-background-white-pale transition-colors',
  },
  variants: {
    state: {
      current: {
        base: 'font-bold text-text-primary',
        circle: 'border-[3px] border-border-primary bg-background-white-pale',
      },
      visited: {
        base: 'text-text-body before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:border-border-primary before:transition-colors',
        // Can't use a const without getting tailwind errors, compound slots/variants don't work correctly for this

        circle: 'border-[3px] border-border-primary bg-surface-primary',
      },
      'non-visited': {
        base: 'text-text-muted/90',
        circle: 'border-2 border-border-muted-strong bg-background-white-pale',
      },
      'current-visited': {
        base: 'font-bold text-text-primary before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:border-border-primary before:transition-colors',
        circle: 'border-[3px] border-border-primary bg-surface-primary',
      },
      'last-visited': {
        base: 'text-text-body after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:border-border-primary after:transition-colors',
        circle: 'border-[3px] border-border-primary bg-surface-primary',
      },
      'last-current': {
        base: 'font-bold text-text-primary',
        circle: 'border-[3px] border-border-primary bg-surface-primary',
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
      true: { base: 'text-text-body', circle: 'border-[3px] border-border-primary bg-background-white-pale' },
      false: {},
    },
    size: {
      medium: {
        circle: 'size-[0.875rem]',
      },
      small: {
        circle: 'mr-[0.25rem] size-[0.625rem] translate-x-[0.125rem]',
        base: 'gap-4',
      },
    },
    previousStepGroup: {
      true: {
        base: 'after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:border-border-primary after:transition-colors',
      },
      false: {},
    },
    isFocusVisible: {
      true: { base: '!focus-outline' },
    },
  },
});
