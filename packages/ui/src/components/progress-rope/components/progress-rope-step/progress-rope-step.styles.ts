import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex w-full gap-2 pt-[0.5rem] pb-[0.875rem] typography-body-10 leading-loose outline-transparent transition-colors',
    circle: 'relative z-10 bg-background-white transition-colors',
    label: 'grid w-full grid-cols-[auto_1fr] items-center',
    subText: 'col-start-2 pt-[0.75rem] typography-body-10 font-normal text-text-muted',
  },
  variants: {
    variant: {
      progress: {
        base: 'cursor-pointer items-center',
      },
      status: {
        base: 'cursor-default items-start text-text-body',
      },
    },
    state: {
      current: {
        base: '',
        circle: 'border-[3px] bg-background-white',
      },
      visited: {
        base: 'before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        circle: 'border-[3px]',
      },
      'non-visited': {
        base: '',
        circle: 'border-2 bg-background-white',
      },
      'current-visited': {
        base: 'before:absolute before:inset-y-0 before:left-1 before:z-10 before:block before:translate-y-[1.25rem] before:border-l-2 before:transition-colors',
        circle: 'border-[3px]',
      },
      'last-visited': {
        base: 'after:absolute after:top-0 after:left-1 after:z-[1] after:block after:h-[1.25rem] after:border-l-2 after:transition-colors',
        circle: 'border-[3px]',
      },
      'last-current': {
        base: '',
        circle: 'border-[3px]',
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
      true: { base: '', circle: 'border-[3px] bg-background-white' },
      false: {},
    },
    size: {
      medium: {
        circle: 'size-[0.875rem]',
        label: 'gap-x-2',
      },
      small: {
        circle: 'mr-[0.25rem] size-[0.625rem] translate-x-[0.125rem]',
        base: 'gap-4',
        label: 'gap-x-4',
      },
    },
    previousStepGroup: {
      true: {
        base: 'after:absolute after:top-0 after:left-1 after:z-[1] after:block after:h-[1.25rem] after:border-l-2 after:transition-colors',
      },
      false: {},
    },
    isFocusVisible: {
      true: { base: '!focus-outline' },
    },
  },
  compoundSlots: [
    {
      slots: ['base'],
      variant: 'status',
      className: 'pb-[1.875rem]',
    },
    {
      slots: ['label'],
      variant: 'status',
      lastItemInRope: true,
      className:
        'after:absolute after:top-[1.25rem] after:bottom-0 after:left-1 after:z-[1] after:block after:border-l-2 after:border-background-white',
    },
    {
      slots: ['label'],
      variant: 'status',
      lastItemInRopeGrouped: true,
      className:
        'after:absolute after:top-[1.25rem] after:bottom-0 after:left-1 after:z-[1] after:block after:border-l-2 after:border-background-white',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: 'current',
      className: 'font-bold text-text-primary',
    },
    {
      slots: ['circle'],
      variant: 'progress',
      state: 'current',
      className: 'border-border-primary',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: ['visited', 'last-visited'],
      className: 'text-text-body',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: ['current-visited', 'last-current'],
      className: 'font-bold text-text-primary',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: ['visited', 'current-visited'],
      className: 'before:border-border-primary',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: 'last-visited',
      className: 'after:border-border-primary',
    },
    {
      slots: ['circle'],
      variant: 'progress',
      state: ['visited', 'current-visited', 'last-visited', 'last-current'],
      className: 'border-border-primary bg-surface-primary',
    },
    {
      slots: ['circle'],
      variant: 'status',
      state: 'current',
      className: 'border-border-hero',
    },
    {
      slots: ['base'],
      variant: 'status',
      state: ['visited', 'current-visited'],
      className: 'before:border-border-hero',
    },
    {
      slots: ['base'],
      variant: 'status',
      state: 'last-visited',
      className: 'after:border-border-hero',
    },
    {
      slots: ['circle'],
      variant: 'status',
      state: ['visited', 'current-visited', 'last-visited', 'last-current'],
      className: 'border-border-hero bg-surface-hero',
    },
    {
      slots: ['base'],
      variant: 'progress',
      state: 'non-visited',
      className: 'text-text-muted/90',
    },
    {
      slots: ['base'],
      variant: 'status',
      state: 'non-visited',
      className: 'text-text-muted',
    },
    {
      slots: ['circle'],
      variant: ['progress', 'status'],
      state: 'non-visited',
      className: 'border-border-muted-strong',
    },
    {
      slots: ['base'],
      variant: ['progress', 'status'],
      furthestVisited: true,
      className: 'text-text-body',
    },
    {
      slots: ['circle'],
      variant: 'progress',
      furthestVisited: true,
      className: 'border-border-primary',
    },
    {
      slots: ['circle'],
      variant: 'status',
      furthestVisited: true,
      className: 'border-border-hero',
    },
    {
      slots: ['base'],
      variant: 'progress',
      previousStepGroup: true,
      className: 'after:border-border-primary',
    },
    {
      slots: ['base'],
      variant: 'status',
      previousStepGroup: true,
      className: 'after:border-border-hero',
    },
  ],
});
