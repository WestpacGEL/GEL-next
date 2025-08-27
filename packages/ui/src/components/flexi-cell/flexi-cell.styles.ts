import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'relative flex transition-colors',
      topBadgeWrapper: 'absolute right-[-1px] top-[-1px]',
      topBadge: 'rounded-br-none rounded-tl-none',
    },
    variants: {
      withBorder: {
        true: {
          base: 'rounded border border-border-muted-soft bg-background-white-pale',
        },
        false: { base: '!px-0' },
      },
      isLink: {
        true: {
          base: 'hover:border-border-hero',
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
