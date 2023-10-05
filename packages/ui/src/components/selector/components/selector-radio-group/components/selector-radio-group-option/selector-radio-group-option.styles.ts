import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'group/radio-option cursor-pointer',
      icon: 'transition-transform',
    },
    variants: {
      checkIcon: {
        arrow: {
          icon: 'text-primary group-hover/radio-option:translate-x-1',
        },
        checkbox: {},
      },
      isSelected: {
        true: {
          base: 'border-hero shadow-hero shadow-[0_0_0_2px_inset]',
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
        false: {},
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
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
