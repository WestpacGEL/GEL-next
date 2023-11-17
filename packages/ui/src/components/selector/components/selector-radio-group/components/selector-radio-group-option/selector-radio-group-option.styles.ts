import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'group/radio-option max-sm:mb-0 sm:mb-0',
      icon: 'transition-transform',
    },
    variants: {
      checkIcon: {
        arrow: {
          icon: 'text-primary',
        },
        checkbox: {},
      },
      isSelected: {
        true: {
          base: 'border-hero shadow-[0_0_0_2px_inset] shadow-hero',
        },
        false: {},
      },
      isFocused: {
        true: {
          base: 'focus-outline',
        },
        false: {},
      },
      isDisabled: {
        true: {
          base: 'opacity-50',
        },
        false: { base: 'cursor-pointer hover:border-hero' },
      },
    },
    compoundVariants: [
      {
        checkIcon: 'checkbox',
        isSelected: false,
        className: {
          icon: 'opacity-0',
        },
      },
      {
        checkIcon: 'checkbox',
        isSelected: true,
        className: {
          icon: 'opacity-100',
        },
      },
      {
        checkIcon: 'arrow',
        isDisabled: false,
        className: {
          icon: 'group-hover/radio-option:translate-x-1',
        },
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
