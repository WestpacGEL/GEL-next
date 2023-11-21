import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'border-t border-t-border first:border-t-0',
      link: 'flex h-10 cursor-pointer items-center justify-between bg-white px-1 py-[0.625rem] transition-colors hover:bg-light focus:bg-light',
    },
    variants: {
      isFocused: {
        true: {
          link: 'bg-light',
        },
      },
      isSelected: {
        true: {
          link: 'text-primary',
        },
      },
      isDisabled: {
        true: {
          link: 'text-muted',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
