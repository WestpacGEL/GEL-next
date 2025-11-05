import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex bg-white transition-colors [&_:focus-visible]:focus-outline',
      topBadgeWrapper: 'absolute right-[-1px] top-[-1px]',
      topBadge: 'rounded-br-none rounded-tl-none',
    },
    variants: {
      withBorder: {
        true: {
          base: 'rounded border border-borderDark',
        },
        false: { base: '!px-0' },
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
      size: {
        default: { base: 'mb-2 gap-2 p-2' },
        large: { base: 'mb-3 gap-3 p-3' },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
