import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'bg-background-hero sticky top-0 z-[1000] flex w-full items-center gap-2 px-2 py-2.5 antialiased transition-colors sm:px-4 md:-top-27 md:h-[14.25rem] md:items-end',
    gridButton: 'focus-visible:focus-outline flex h-6 items-stretch gap-0.5 p-1',
    gridButtonWrapper: 'fixed top-2 right-2 hidden items-center text-white sm:flex',
    hamburgerButton:
      'focus-visible:focus-outline fixed top-0 left-0 block -translate-y-0.5 px-2 py-3.5 focus-visible:!outline-offset-[-2px] sm:left-2 lg:hidden',
    title: 'typography-brand-7 text-text-reversed pt-[0.3125rem] pl-6 font-normal focus:outline-none sm:pl-6 lg:pl-0',
    titleWrapper: 'flex flex-1 justify-between',
  },
  variants: {
    fixed: {
      true: {
        base: 'items-center shadow-[0_2px_5px_rgba(0,0,0,0.3)]',
        title: '',
        titleWrapper: 'items-center',
      },
      false: {
        base: '',
        title: 'md:typography-brand-2 md:px-2 md:pt-5 md:pb-4.5 md:leading-none lg:ml-2',
        titleWrapper: 'items-center',
      },
    },
    brand: {
      wbg: {},
      bom: {},
      bsa: {
        base: 'bg-[url(/imgs/backgrounds/bsa-background.svg),_linear-gradient(to_right,#002f6c,#00adbd)] bg-cover',
      },
      rams: {
        base: 'bg-background-hero',
      },
      stg: {
        base: 'bg-background-hero bg-[url(/imgs/backgrounds/stg-background.svg)] bg-cover',
      },
      wbc: {
        base: 'bg-background-primary bg-[url(/imgs/backgrounds/wbc-background.svg)] bg-contain bg-right-bottom bg-no-repeat',
        title: 'uppercase',
      },
    },
  },
});
