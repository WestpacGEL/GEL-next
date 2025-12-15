import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    listItem: 'border-b border-b-border hover:bg-background',
    button:
      'flex w-full cursor-pointer items-center gap-1 p-2 focus-visible:bg-background focus-visible:outline-2 focus-visible:!outline-offset-[-2px] focus-visible:focus-outline',
    checkbox: 'flex size-4 items-center justify-center rounded border border-hero',
    indeterminate: 'block w-3/5 border-t-2 border-t-muted',
  },
  variants: {
    selected: {
      true: { listItem: 'bg-background' },
      false: { listItem: '' },
    },
  },
});
