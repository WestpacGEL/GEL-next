import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'sticky top-0 z-50 flex w-full items-center gap-2 bg-hero px-3 py-2 transition-colors md:top-[-162px] md:h-[228px] md:items-end',
      hamburgerButton: 'h-6 w-6 md:hidden',
      title: 'typography-brand-8 font-bold text-white',
    },
    variants: {
      fixed: {
        true: {
          base: 'items-center',
          title: 'pb-1',
        },
        false: {
          base: '',
          title: 'p-0 md:typography-brand-2 md:p-3',
        },
      },
      brand: {
        wbg: {},
        bom: {},
        bsa: {
          base: 'bg-[url("/imgs/backgrounds/bsa-background.svg"),_linear-gradient(to_right,#002f6c,#00adbd)] bg-cover',
        },
        rams: {
          base: 'bg-heading',
        },
        stg: {
          base: 'bg-heading bg-[url("/imgs/backgrounds/stg-background.svg")] bg-cover',
        },
        wbc: {
          base: 'bg-primary bg-[url("/imgs/backgrounds/wbc-background.svg")] bg-right-bottom bg-no-repeat',
          title: 'uppercase',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
