import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      relative -mx-4 flex flex-col px-4
      xsl:-mx-5 xsl:px-5
    `,
    label: 'block cursor-default text-left text-sm font-medium text-text-body',
    button: `
      relative flex h-11 max-w-full cursor-pointer flex-row items-stretch
      overflow-hidden pt-1.5 outline-none
      focus:focus-outline
    `,
    popover: 'w-full',
    iconWrapper: `
      pointer-events-none mb-[-0.4rem] flex flex-shrink-0 touch-none
      items-center text-text-primary
    `,
    textWrapper: 'flex flex-shrink items-center overflow-hidden pr-2',
  },
  variants: {
    isFocusVisible: {
      true: {
        base: 'focus-outline',
      },
      false: {},
    },
  },
  compoundSlots: [],
});
