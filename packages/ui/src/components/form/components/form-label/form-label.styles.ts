import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 block font-medium',
    variants: {
      spacing: {
        medium: '',
        large: '',
      },
      subLabel: {
        true: 'typography-body-10',
        false: 'typography-body-9',
      },
    },
    compoundVariants: [
      {
        subLabel: true,
        spacing: 'medium',
        className: 'mb-1',
      },
      {
        subLabel: true,
        spacing: 'large',
        className: 'mb-1',
      },
      {
        subLabel: false,
        spacing: 'medium',
        className: 'mb-2',
      },
      {
        subLabel: false,
        spacing: 'large',
        className: 'mb-3',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
