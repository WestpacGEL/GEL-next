import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'border-border-muted-soft bg-background-white-pale box-border w-full overflow-hidden border p-[0.0625rem]',
    innerBar:
      'bg-surface-hero box-border h-full overflow-hidden text-right leading-tight transition-[width] duration-[.6s]',
    label: 'typography-body-10 text-text-mono mx-2 my-0 block font-bold',
  },
  variants: {
    look: {
      default: {
        base: 'h-4 rounded-full',
        innerBar: 'rounded-full',
      },
      skinny: {
        base: 'h-[0.625rem] rounded-full',
        innerBar: 'rounded-full',
      },
    },
  },
});
