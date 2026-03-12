import { tv } from 'tailwind-variants';

export const styles = tv({
  base: `
    relative flex h-9 flex-1 cursor-pointer items-center justify-center border-r
    border-r-border-muted-soft typography-body-11 font-semibold text-text-muted
    after:absolute after:inset-x-0 after:bottom-0 after:h-0 after:border-b-[3px]
    after:border-[transparent]
    last:border-r-0
    sm:h-11 sm:grow-0 sm:px-10 sm:last:border-r
    md:typography-body-9
  `,
  variants: {
    selected: {
      true: `
        text-text-body
        after:border-border-primary
      `,
    },
    isFocusVisible: {
      true: `
        focus-outline !outline-offset-0
        focus:focus-outline
        focus-visible:focus-outline
      `,
      false: 'outline-none',
    },
  },
});
