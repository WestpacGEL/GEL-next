import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'relative flex transition-colors',
    topBadgeWrapper: 'absolute top-[-1px] right-[-1px]',
    topBadge: 'rounded-tl-none rounded-br-none',
  },
  variants: {
    withBorder: {
      true: {
        base: 'border-border-muted-soft bg-background-white-pale rounded-2xl border',
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
});
