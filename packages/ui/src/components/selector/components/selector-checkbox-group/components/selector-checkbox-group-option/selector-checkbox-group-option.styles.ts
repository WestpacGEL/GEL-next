import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'group/checkbox-option max-sm:mb-0 max-sm:gap-2 max-sm:p-2 sm:mb-0 sm:gap-3 sm:p-3',
      icon: 'transition-transform',
    },
    variants: {
      checkIcon: {
        arrow: {
          icon: 'mr-[-6px] text-primary',
        },
        checkbox: {},
      },
      isSelected: {
        true: {
          base: 'border-hero shadow-[0_0_0_2px_inset]',
        },
        false: {},
      },
      isFocusVisible: {
        true: {
          base: 'focus-outline',
        },
        false: {},
      },
      isDisabled: {
        true: {
          base: 'opacity-50',
        },
        false: {
          base: 'cursor-pointer hover:border-hero',
        },
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
          icon: 'max-sm:group-hover/checkbox-option:translate-x-0.5 sm:group-hover/checkbox-option:translate-x-1',
        },
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
