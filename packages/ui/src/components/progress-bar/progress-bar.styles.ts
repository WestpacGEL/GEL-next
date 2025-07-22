import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'bg-white[REPLACE TOKEN] box-border w-full overflow-hidden border border-border-muted-soft p-[0.0625rem]',
      innerBar: 'box-border h-full bg-surface-hero text-right leading-tight transition-[width] duration-[.6s]',
      label: 'text-white[REPLACE TOKEN] typography-body-10 mx-2 my-0 block font-bold',
    },
    variants: {
      look: {
        default: {
          base: 'h-4 rounded-3xl',
          innerBar: ' rounded-3xl',
        },
        skinny: {
          base: 'h-[0.625rem] rounded-[0.625rem]',
          innerBar: 'rounded-[0.625rem]',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
