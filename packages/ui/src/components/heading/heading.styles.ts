import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'text-text-body',
  variants: {
    size: {
      1: 'typography-body-1',
      2: 'typography-body-2',
      3: 'typography-body-3',
      4: 'typography-body-4',
      5: 'typography-body-5',
      6: 'typography-body-6',
      7: 'typography-body-7',
      8: 'typography-body-8',
      9: 'typography-body-9',
      10: 'typography-body-10',
    },
    brandHeading: {
      true: '',
      false: '',
    },
    uppercase: {
      true: 'uppercase',
      false: '',
    },
  },
  compoundVariants: [
    {
      brandHeading: true,
      size: 1,
      class: 'typography-brand-1',
    },
    {
      brandHeading: true,
      size: 2,
      class: 'typography-brand-2',
    },
    {
      brandHeading: true,
      size: 3,
      class: 'typography-brand-3',
    },
    {
      brandHeading: true,
      size: 4,
      class: 'typography-brand-4',
    },
    {
      brandHeading: true,
      size: 5,
      class: 'typography-brand-5',
    },
    {
      brandHeading: true,
      size: 6,
      class: 'typography-brand-6',
    },
    {
      brandHeading: true,
      size: 7,
      class: 'typography-brand-7',
    },
    {
      brandHeading: true,
      size: 8,
      class: 'typography-brand-8',
    },
    {
      brandHeading: true,
      size: 9,
      class: 'typography-brand-9',
    },
    {
      brandHeading: true,
      size: 10,
      class: 'typography-brand-10',
    },
  ],
});
