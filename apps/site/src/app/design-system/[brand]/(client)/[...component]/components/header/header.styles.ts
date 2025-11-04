import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      sticky top-0 z-[1000] flex h-11 w-full items-center gap-2
      bg-background-hero px-2 py-2.5 antialiased transition-colors
      sm:px-4
      md:-top-27 md:h-[14.25rem] md:items-end
    `,
    gridButton: `
      flex h-6 items-stretch gap-0.5 p-1
      focus-visible:focus-outline
    `,
    gridButtonWrapper: `
      fixed top-2 right-2 hidden items-center text-white
      sm:flex
    `,
    hamburgerButton: `
      fixed top-0 left-0 block -translate-y-0.5 px-2 py-3.5
      focus-visible:focus-outline focus-visible:!outline-offset-[-2px]
      sm:left-2
      lg:hidden
    `,
    title: `
      pt-[0.3125rem] pl-6 typography-brand-7 font-normal text-text-reversed
      focus:outline-none
      sm:pl-6
      lg:pl-0
    `,
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
        title: `
          md:px-2 md:pt-5 md:pb-5.5 md:typography-brand-2 md:leading-none
          lg:ml-2
        `,
        titleWrapper: 'items-center',
      },
    },
    brand: {
      wbg: {},
      bom: {},
      bsa: {
        base: `
          bg-[url(/imgs/backgrounds/bsa-background.svg),_linear-gradient(to_right,#002f6c,#00adbd)]
          bg-cover
        `,
      },
      rams: {
        base: 'bg-background-hero',
      },
      stg: {
        base: `
          bg-background-hero bg-[url(/imgs/backgrounds/stg-background.svg)]
          bg-cover
        `,
      },
      wbc: {
        base: `
          bg-background-primary bg-[url(/imgs/backgrounds/wbc-background.svg)]
          bg-contain bg-right-bottom bg-no-repeat
        `,
        title: 'uppercase',
      },
    },
  },
});
