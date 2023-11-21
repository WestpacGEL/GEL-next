import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'sticky top-0 z-50 flex w-full items-center gap-2 bg-hero px-2 py-3.5 transition-colors sm:px-4 md:top-[-10.125rem] md:h-[14.25rem] md:items-end',
      gridButton: 'flex h-6 gap-[0.125rem] p-1',
      gridButtonWrapper: 'fixed right-2 top-2 hidden items-center text-white sm:flex',
      hamburgerButton: 'fixed left-0 top-0 block h-4 w-4 translate-y-[-0.125rem] px-2 py-3.5 sm:left-2 lg:hidden',
      title: 'typography-brand-7 pl-6 font-normal leading-none text-white sm:pl-6 lg:pl-0',
    },
    variants: {
      fixed: {
        true: {
          base: 'items-center',
          title: '',
        },
        false: {
          base: '',
          title: 'md:typography-brand-2 md:px-3 md:py-5',
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
