import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'border-t-border text-text hover:bg-hero focus:bg-hero group flex cursor-pointer items-center justify-between border-t bg-white p-2 px-3 text-sm transition-colors first:border-t-0 hover:text-white focus:text-white',
    variants: {
      isFocused: {
        true: 'bg-hero is-focused !text-white',
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
