import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-muted-strong',
    ul: 'w-full outline-none',
  },
  variants: {
    hasSection: {
      true: {
        ul: '',
      },
      false: {
        ul: 'py-2',
      },
    },
  },
});
