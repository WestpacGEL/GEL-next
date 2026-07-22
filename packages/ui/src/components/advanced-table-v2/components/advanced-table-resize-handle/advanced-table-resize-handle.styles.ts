import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    bar: 'h-4 w-[3px] rounded bg-surface-muted-strong',
    // 18px-wide, under the recommended 24px minimum but is smaller in react-aria
    // Offset -10px so the centered bar lands on the cell border rather than the padded content edge;
    // z-[3] keeps it above a pinned (z-1) or actively-dragged (z-2) neighboring header cell.
    handle:
      'absolute inset-y-0 right-[-10px] z-[3] flex w-[18px] cursor-col-resize items-center justify-center focus-visible:focus-outline',
  },
});
