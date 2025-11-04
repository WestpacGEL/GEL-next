import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative overflow-hidden border-t border-t-border-muted-soft bg-background-white-pale',
    wrapper: 'pt-3 max-md:px-2 max-md:pb-3 md:px-4 md:pb-4',
    topRow: 'text-text-muted',
    link: 'float-right block',
    logoWrapper: 'flex justify-end',
  },
  variants: {
    offsetSidebar: {
      true: {
        base: 'lg:mr-[300px]',
      },
      false: {},
    },
    isFocusVisible: {
      true: { link: 'focus-outline' },
    },
    hideLogo: {
      true: '',
      false: { topRow: 'max-md:mb-7 md:mb-4' },
    },
  },
});
