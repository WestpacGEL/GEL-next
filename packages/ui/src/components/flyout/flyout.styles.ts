import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'fixed inset-y-0 z-50 flex flex-col bg-background-white',
    body: 'min-h-0 flex-1 overflow-auto',
    close: 'ml-auto size-4 shrink-0 p-0',
    header: 'flex h-9 w-full shrink-0 items-center justify-between px-2',
    heading: 'min-w-0 typography-body-10 font-bold text-text-body',
  },
  variants: {
    position: {
      left: {
        base: 'left-0 border-r border-border-muted-soft',
      },
      right: {
        base: 'right-0 border-l border-border-muted-soft',
      },
    },
  },
});
