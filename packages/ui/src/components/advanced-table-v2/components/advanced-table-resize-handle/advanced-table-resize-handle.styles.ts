import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    // 18px-wide, under the recommended 24px minimum but is smaller in react-aria
    handle:
      'absolute inset-y-0 right-0 flex w-[18px] cursor-col-resize items-center justify-center focus-visible:focus-outline',
    bar: 'h-4 w-[3px] rounded bg-surface-muted-strong',
  },
});
