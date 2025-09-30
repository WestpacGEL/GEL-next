import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'typography-body-10 relative flex w-full cursor-pointer items-center gap-2 pt-[0.5rem] pb-[0.875rem] leading-loose transition-colors',
    circle: 'bg-background-white-pale relative z-10 transition-colors',
  },
  variants: {
    state: {
      current: {
        base: 'text-text-primary font-bold',
        circle: 'border-border-primary bg-background-white-pale border-[3px]',
      },
      visited: {
        base: 'text-text-body before:border-border-primary before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        // Can't use a const without getting tailwind errors, compound slots/variants don't work correctly for this

        circle: 'border-border-primary bg-surface-primary border-[3px]',
      },
      'non-visited': {
        base: 'text-text-muted/90',
        circle: 'border-border-muted-strong bg-background-white-pale border-2',
      },
      'current-visited': {
        base: 'text-text-primary before:border-border-primary font-bold before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        circle: 'border-border-primary bg-surface-primary border-[3px]',
      },
      'last-visited': {
        base: 'text-text-body after:border-border-primary after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:transition-colors',
        circle: 'border-border-primary bg-surface-primary border-[3px]',
      },
      'last-current': {
        base: 'text-text-primary font-bold ',
        circle: 'border-border-primary bg-surface-primary border-[3px]',
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
      true: { base: 'text-text-body', circle: 'border-border-primary bg-background-white-pale border-[3px]' },
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
        base: 'after:border-border-primary after:absolute after:inset-y-[0.875rem] after:left-1 after:z-[1] after:block after:translate-y-[-0.875rem] after:border-l-2 after:transition-colors',
      },
      false: {},
    },
    isFocusVisible: {
      true: { base: 'focus-outline' },
    },
  },
});
