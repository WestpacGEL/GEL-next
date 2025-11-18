import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'group flex cursor-pointer justify-between gap-1 bg-background-white-pale p-2 text-sm text-text-body transition-colors',
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-muted-strong',
    body: '-mt-0.5 flex-1',
    flexZero: 'flex-0',
  },
  variants: {
    focused: {
      true: {
        // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
        root: 'is-focused bg-surface-hero text-text-mono',
      },
    },
    selected: {
      true: {
        root: 'font-bold',
      },
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed text-text-muted',
      },
    },
  },
  compoundVariants: [
    {
      // Selected + focused -> same pink color
      selected: true,
      focused: true,
      className: {
        root: 'text-text-mono',
      },
    },
  ],
});
