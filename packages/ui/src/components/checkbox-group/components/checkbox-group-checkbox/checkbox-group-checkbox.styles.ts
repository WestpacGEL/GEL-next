import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex',
      checkIcon: 'overflow-visible',
      textWrapper: 'flex flex-col justify-center',
      labelText: 'typography-body-10 py-[2px] pl-1 text-text-body',
      hintText: 'typography-body-10 pl-1 text-text-muted',
      checkbox: 'flex shrink-0 items-center justify-center rounded border border-border-hero bg-surface-white-faint',
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
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
