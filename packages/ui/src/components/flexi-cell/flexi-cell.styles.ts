import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex bg-white transition-colors max-sm:mb-2 max-sm:gap-2 max-sm:p-2 sm:mb-3 sm:gap-3 sm:p-3',
      topBadgeWrapper: 'absolute right-[-1px] top-[-1px]',
      topBadge: 'rounded-br-none rounded-tl-none',
    },
    variants: {
      withBorder: {
        true: {
          base: 'rounded border border-borderDark',
        },
      },
      isLink: {
        true: {
          base: 'hover:border-hero',
        },
        false: '',
      },
      isFocusVisible: { true: { base: 'focus-outline' }, false: {} },
      shouldHoverEffect: {
        true: {
          base: 'group/noborder',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
