import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'flex h-10 cursor-pointer items-center justify-between border-t border-t-border bg-white px-3 py-[10px] transition-colors first:border-t-0 hover:bg-light focus:bg-light',
    variants: {
      isFocused: {
        true: 'bg-light',
      },
      isSelected: {
        true: 'text-primary',
      },
      isDisabled: {
        true: 'text-muted',
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
