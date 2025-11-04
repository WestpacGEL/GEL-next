import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'relative box-border border border-border-muted-strong bg-surface-muted-pale whitespace-nowrap',
  variants: {
    position: {
      before: 'rounded-l',
      after: 'rounded-r',
    },
    size: {
      small: 'h-5 px-1.5 pt-0.5 pb-[0.25rem] typography-body-10',
      medium: 'h-6 px-2 py-[0.3125rem] typography-body-9',
      large: 'h-7 px-2.5 py-[0.5rem] typography-body-9',
      xlarge: 'h-8 px-3 py-1.5 pb-[0.625rem] typography-body-8',
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
