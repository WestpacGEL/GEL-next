import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'box-border w-full overflow-hidden border border-border bg-white p-[0.0625rem]',
      innerBar: 'box-border h-full bg-hero text-right leading-tight transition-[width] duration-[.6s]',
      label: 'typography-body-10 mx-[0.75rem] my-0 block font-bold text-white',
    },
    variants: {
      look: {
        default: {
          base: 'h-[1.5rem] rounded-[1.5rem]',
          innerBar: ' rounded-[1.5rem]',
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
