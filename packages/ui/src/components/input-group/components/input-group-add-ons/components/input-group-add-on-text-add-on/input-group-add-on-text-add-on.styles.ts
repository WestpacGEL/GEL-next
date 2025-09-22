import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'border-border-muted-strong bg-surface-muted-pale relative box-border border whitespace-nowrap',
  variants: {
    position: {
      before: 'rounded-l',
      after: 'rounded-r',
    },
    size: {
      small: 'typography-body-10 h-5 px-1.5 pt-0.5 pb-[0.25rem]',
      medium: 'typography-body-9 h-6 px-2 py-[0.3125rem]',
      large: 'typography-body-9 h-7 px-2.5 py-[0.5rem]',
      xlarge: 'typography-body-8 h-8 px-3 py-1.5 pb-[0.625rem]',
    },
  },
  compoundVariants: [
    {
      position: 'before',
      size: 'small',
      className: 'rounded-l-sm',
    },
    {
      position: 'before',
      size: 'medium',
      className: 'rounded-l-md',
    },
    {
      position: 'before',
      size: 'large',
      className: 'rounded-l-lg',
    },
    {
      position: 'before',
      size: 'xlarge',
      className: 'rounded-l-xl',
    },
    {
      position: 'after',
      size: 'small',
      className: 'rounded-r-sm',
    },
    {
      position: 'after',
      size: 'medium',
      className: 'rounded-r-md',
    },
    {
      position: 'after',
      size: 'large',
      className: 'rounded-r-lg',
    },
    {
      position: 'after',
      size: 'xlarge',
      className: 'rounded-r-xl',
    },
  ],
});
