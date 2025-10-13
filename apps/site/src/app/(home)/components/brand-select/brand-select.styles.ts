import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'xsl:-mx-5 xsl:px-5 relative -mx-4 flex flex-col px-4',
    label: 'text-text block cursor-default text-left text-sm font-medium',
    button:
      'focus:focus-outline relative flex h-11 max-w-full cursor-pointer flex-row items-stretch overflow-hidden pt-1.5 outline-none',
    popover: 'w-full',
    iconWrapper: 'text-text-primary pointer-events-none mb-[-0.4rem] flex flex-shrink-0 touch-none items-center',
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
