import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex',
    checkIcon: 'overflow-visible',
    textWrapper: 'flex flex-col justify-center',
    labelText: 'typography-body-10 text-text-body py-[2px] pl-1',
    hintText: 'typography-body-10 text-text-muted pl-1',
    checkbox: 'border-border-hero bg-background-white-pale flex shrink-0 items-center justify-center rounded-sm border',
  },
  variants: {
    isDisabled: {
      true: {
        labelText: 'text-text-muted',
        checkbox: 'border-border-muted-soft bg-surface-muted-faint',
      },
      false: {
        base: 'hover:cursor-pointer',
      },
    },
    isFocusVisible: {
      true: { checkbox: 'focus-outline' },
    },
    orientation: {
      horizontal: {
        base: 'mr-3',
      },
      vertical: {
        base: '',
      },
    },
    size: {
      large: {
        checkIcon: 'size-5',
        base: 'mb-2',
        checkbox: 'size-5',
      },
      medium: {
        checkIcon: 'size-4',
        base: 'mb-1',
        checkbox: 'size-4',
      },
    },
  },
});
