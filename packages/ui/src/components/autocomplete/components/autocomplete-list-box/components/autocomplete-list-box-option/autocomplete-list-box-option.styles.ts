import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'group flex cursor-pointer items-center justify-between border-t border-t-border bg-white p-2 px-3 text-sm text-text transition-colors first:border-t-0 hover:bg-hero hover:text-white focus:bg-hero focus:text-white',
    variants: {
      isFocused: {
        true: 'is-focused bg-hero !text-white',
      },
      isSelected: {
        true: 'font-bold',
      },
      isDisabled: {
        true: 'text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
