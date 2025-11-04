import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'block typography-body-9 leading-loose font-medium text-text-body',
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
});
