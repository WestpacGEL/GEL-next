import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'group flex cursor-pointer items-center justify-between bg-surface-white-faint p-2 px-3 text-sm text-text-body transition-colors',
    variants: {
      isFocused: {
        true: 'is-focused bg-surface-muted-pale',
      },
      isSelected: {
        true: 'font-bold',
      },
      isDisabled: {
        true: 'text-text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
