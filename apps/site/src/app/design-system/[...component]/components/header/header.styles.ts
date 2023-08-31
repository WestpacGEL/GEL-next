import { tv } from 'tailwind-variants';
// linear-gradient(to right, rgb(0, 47, 108) 0%, rgb(0, 70, 142) 50%, rgb(0, 173, 189) 100%)
export const styles = tv(
  {
    slots: {
      base: 'bg-hero sticky top-0 z-50 flex w-full items-center gap-2 px-3 py-2 transition-colors md:top-[-260px] md:h-[20rem] md:items-end',
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
          title: 'md:typography-brand-2 p-0 md:p-3',
        },
      },
      brand: {
        btfg: {},
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
        },
      },
    },
    compoundSlots: [
      // {
      //   slots: ['itemHeader'],
      //   color: 'primary',
      //   isOpen: true,
      //   className: 'border-l-primary',
      // },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
