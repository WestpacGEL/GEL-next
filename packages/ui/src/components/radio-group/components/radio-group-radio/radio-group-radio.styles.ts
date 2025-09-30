import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'flex',
    textWrapper: 'flex flex-col justify-center',
    labelText: 'typography-body-10 text-text-body py-[2px] pl-1',
    hintText: 'typography-body-10 text-text-muted pl-1',
    selector:
      'border-border-hero bg-background-white-pale flex size-4 shrink-0 items-center justify-center rounded-full border',
  },
  variants: {
    isDisabled: {
      true: {
        labelText: 'text-text-muted',
        selector: 'border-border-muted-soft bg-surface-muted-faint before:bg-surface-muted-soft',
      },
      false: {
        base: 'hover:cursor-pointer',
      },
    },
    isSelected: {
      true: {
        selector: 'before:bg-surface-hero before:block before:size-2 before:rounded-full',
      },
    },
    isFocusVisible: {
      true: { selector: 'focus-outline' },
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
        selector: 'size-5',
        base: 'mb-2',
      },
      medium: {
        selector: 'size-4',
        base: 'mb-1',
      },
    },
  },
});
