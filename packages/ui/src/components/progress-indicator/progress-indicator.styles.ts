import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      icon: 'absolute inset-0 m-auto',
      base: 'animate-[spin_0.7s_linear_infinite]',
      container: 'flex flex-col items-center',
      label: 'typography-body-9 mt-1.5',
    },
    variants: {
      size: {
        xsmall: { base: 'h-2 w-2' },
        small: { base: 'h-3 w-3' },
        medium: { base: 'h-4 w-4' },
        large: { base: 'h-15 w-15' },
        xlarge: { base: 'h-15 w-15' },
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['icon', 'base', 'container'],
        inverted: true,
        class: ['text-white'],
      },
      {
        slots: ['icon', 'base', 'container'],
        inverted: false,
        class: ['text-hero'],
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
