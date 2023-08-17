import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'mb-1 inline-flex items-center hover:cursor-pointer',
      switchDiv:
        'border-borderDark after:shadow-switch relative box-content overflow-hidden border transition duration-[.3s] after:absolute after:left-0 after:top-0 after:block after:rounded-[50%] after:bg-white after:transition-all after:duration-[.3s]',
      label: 'pr-1',
    },
    variants: {
      size: {
        small: {
          switchDiv: 'h-[1.75rem] w-8 rounded-[1.75rem] after:h-[1.75rem] after:w-[1.75rem]',
        },
        medium: {
          switchDiv: 'h-[2.125rem] w-10 rounded-[2.125rem] after:h-[2.125rem] after:w-[2.125rem]',
        },
        large: {
          switchDiv: 'h-[2.5rem] w-12 rounded-[2.5rem] after:h-[2.5rem] after:w-[2.5rem]',
        },
        xlarge: {
          switchDiv: 'h-[2.875rem] w-14 rounded-[2.875rem] after:h-[2.875rem] after:w-[2.875rem]',
        },
      },
      isFocusVisible: {
        true: {
          switchDiv: 'focus-outline',
        },
      },
      isSelected: {
        true: {
          switchDiv: 'bg-hero border-hero after:left-full after:-translate-x-full',
        },
      },
      isDisabled: {
        true: {
          base: 'pointer-events-none',
          switchDiv: 'opacity-50',
          label: 'opacity-50',
        },
      },
      block: {
        true: {
          base: 'w-full',
          label: 'flex-1',
        },
        false: {
          base: 'mr-3',
        },
      },
    },
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
