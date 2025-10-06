import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'mb-1 inline-flex items-center hover:cursor-pointer',
    switchDiv:
      'border-border-muted-strong relative box-content overflow-hidden border transition duration-[.3s] after:absolute after:top-0 after:left-0 after:block after:rounded-full after:transition-all after:duration-[.3s]',
    label: 'text-text-body pr-1',
  },
  variants: {
    size: {
      small: {
        switchDiv: 'h-[1.75rem] w-8 rounded-[1.75rem] after:size-[1.75rem]',
      },
      medium: {
        switchDiv: 'h-[2.125rem] w-10 rounded-[2.125rem] after:size-[2.125rem]',
      },
      large: {
        switchDiv: 'h-[2.5rem] w-12 rounded-[2.5rem] after:size-[2.5rem]',
      },
      xlarge: {
        switchDiv: 'h-[2.875rem] w-14 rounded-[2.875rem] after:size-[2.875rem]',
      },
    },
    isFocusVisible: {
      true: {
        switchDiv: 'focus-outline',
      },
    },
    isSelected: {
      true: {
        switchDiv:
          'border-border-hero bg-surface-hero after:border-surface-hero after:bg-background-white-pale after:left-full after:-translate-x-full after:border',
      },
      false: {
        switchDiv: 'bg-background-white-pale after:border-background-white-pale after:bg-surface-muted after:border',
      },
    },
    isDisabled: {
      true: {
        base: 'pointer-events-none',
        switchDiv: 'opacity-50',
        label: 'opacity-50',
      },
    },
    block: {
      true: {
        base: 'w-full',
        label: 'flex-1',
      },
      false: {
        base: 'mr-3',
      },
    },
  },
});
