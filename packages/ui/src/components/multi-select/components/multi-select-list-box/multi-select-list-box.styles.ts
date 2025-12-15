import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'max-h-[432px] overflow-auto',
    checkbox: 'flex size-4 items-center justify-center rounded border border-border',
    ul: 'w-full outline-none',
    noItemsText: 'typography-body-9 px-2 py-4 text-text',
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
