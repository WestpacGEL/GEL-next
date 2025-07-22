import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'group flex cursor-pointer items-center justify-between bg-surface-white-faint p-2 px-3 text-sm text-text-body transition-colors hover:bg-surface-hero hover:text-text-mono focus:bg-surface-hero focus:text-text-mono',
    variants: {
      isFocused: {
        true: 'is-focused bg-surface-hero !text-text-mono',
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
