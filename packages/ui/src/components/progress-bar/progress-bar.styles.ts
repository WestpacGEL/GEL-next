import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'box-border w-full overflow-hidden border border-border-muted-soft bg-background-white p-[0.0625rem]',
    innerBar:
      'box-border h-full overflow-hidden bg-surface-hero text-right leading-tight transition-[width] duration-[.6s]',
    label: 'mx-2 my-0 block typography-body-10 font-bold text-text-mono',
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
