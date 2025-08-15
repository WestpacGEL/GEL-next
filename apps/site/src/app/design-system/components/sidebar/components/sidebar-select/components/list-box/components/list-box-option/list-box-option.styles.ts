import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'box-border flex h-10 cursor-pointer items-center justify-between border-t border-t-border-muted-soft bg-surface-white-pale px-3 py-2.5 outline-none transition-colors first:border-t-0 hover:bg-surface-white-faint focus:bg-surface-white-faint',
    variants: {
      isFocusVisible: {
        true: 'bg-light !outline-offset-[-2px] focus-outline',
      },
      isSelected: {
        true: 'font-bold text-text-primary',
      },
      isDisabled: {
        true: 'text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
