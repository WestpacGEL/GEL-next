import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    base: 'typography-body-9 block font-medium leading-loose',
    variants: {
      spacing: {
        medium: '',
        large: '',
      },
      size: {
        small: 'typography-body-10',
        medium: 'typography-body-9',
      },
    },
    compoundVariants: [
      {
        size: 'medium',
        spacing: 'medium',
        className: 'mb-2',
      },
      {
        size: 'medium',
        spacing: 'large',
        className: 'mb-3',
      },
      {
        size: 'small',
        spacing: 'medium',
        className: 'mb-2',
      },
      {
        size: 'small',
        spacing: 'large',
        className: 'mb-3',
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
