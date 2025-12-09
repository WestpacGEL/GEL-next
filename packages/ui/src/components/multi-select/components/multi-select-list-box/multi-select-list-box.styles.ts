import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'max-h-72 overflow-auto',
    checkbox: 'flex size-4 items-center justify-center rounded border border-border-muted-strong',
    ul: 'w-full outline-none',
    noItemsText: 'px-2 py-4 typography-body-9 text-text-body',
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
