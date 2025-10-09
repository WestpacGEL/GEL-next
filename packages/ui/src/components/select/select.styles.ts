import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'relative inline-flex',
    select:
      'form-control disabled:form-control-disabled flex-1 overflow-hidden  bg-no-repeat text-ellipsis  group-first/add-on-before:rounded-r-none group-first/add-on-before:!border-x group-last/add-on-after:rounded-l-none group-last/add-on-after:!border-x group-[.input-group-after]:rounded-r-none group-[.input-group-after]:border-r-0 group-[.input-group-before]:rounded-l-none group-[.input-group-before]:border-l-0',
    caret: 'text-surface-muted-vivid absolute top-1/2 right-2 -translate-y-1/2',
  },
  variants: {
    size: {
      small: {
        select:
          'form-control-small bg-[right_0.5625rem_center] pr-[calc(0.5rem+14px+0.5625rem)] group-first/add-on-before:!rounded-l-sm group-last/add-on-after:!rounded-r-sm',
        root: 'text-sm',
      },
      medium: {
        select:
          'form-control-medium bg-[right_0.75rem_center] pr-[calc(0.5rem+14px+0.75rem)] group-first/add-on-before:!rounded-l-md group-last/add-on-after:!rounded-r-md',
        root: 'typography-body-9',
      },
      large: {
        select:
          'form-control-large bg-[right_0.9375rem_center] pr-[calc(0.5rem+14px+0.9375rem)] group-first/add-on-before:!rounded-l-lg group-last/add-on-after:!rounded-r-lg',
        root: 'text-base',
      },
      xlarge: {
        select:
          'form-control-xlarge bg-[right_1.125rem_center] pr-[calc(0.5rem+14px+1.125rem)] group-first/add-on-before:!rounded-l-xl group-last/add-on-after:!rounded-r-xl',
        root: 'text-lg',
      },
    },
    invalid: {
      true: { select: 'border-border-danger' },
      false: { select: 'border-border-muted-strong' },
    },
    disabled: {
      true: {
        caret: 'text-surface-muted',
      },
    },
    isFocusVisible: {
      true: { select: 'focus-outline' },
    },
    isFocused: {
      true: { select: 'outline-none' },
    },
    width: {
      auto: { root: 'flex-1' },
      full: { root: 'w-full flex-1', select: 'w-full' },
      1: { root: 'w-[1.81ex]', select: 'w-full' },
      2: { root: 'w-[3.62ex]', select: 'w-full' },
      3: { root: 'w-[5.43ex]', select: 'w-full' },
      4: { root: 'w-[7.24ex]', select: 'w-full' },
      5: { root: 'w-[9.05ex]', select: 'w-full' },
      6: { root: 'w-[10.86ex]', select: 'w-full' },
      7: { root: 'w-[12.67ex]', select: 'w-full' },
      8: { root: 'w-[14.48ex]', select: 'w-full' },
      9: { root: 'w-[16.29ex]', select: 'w-full' },
      10: { root: 'w-[18.1ex]', select: 'w-full' },
      20: { root: 'w-[36.2ex]', select: 'w-full' },
      30: { root: 'w-[54.3ex]', select: 'w-full' },
    },
  },
  compoundVariants: [
    { size: 'small', width: 1, className: { root: 'w-[calc(1.81ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 2, className: { root: 'w-[calc(3.62ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 3, className: { root: 'w-[calc(5.43ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 4, className: { root: 'w-[calc(7.24ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 5, className: { root: 'w-[calc(9.05ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 6, className: { root: 'w-[calc(10.86ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 7, className: { root: 'w-[calc(12.67ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 8, className: { root: 'w-[calc(14.48ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 9, className: { root: 'w-[calc(16.29ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 10, className: { root: 'w-[calc(18.1ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 20, className: { root: 'w-[calc(36.2ex+0.5rem+14px+1.5625rem)]' } },
    { size: 'small', width: 30, className: { root: 'w-[calc(54.3ex+0.5rem+14px+1.5625rem)]' } },

    { size: 'medium', width: 1, className: { root: 'w-[calc(1.81ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 2, className: { root: 'w-[calc(3.62ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 3, className: { root: 'w-[calc(5.43ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 4, className: { root: 'w-[calc(7.24ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 5, className: { root: 'w-[calc(9.05ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 6, className: { root: 'w-[calc(10.86ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 7, className: { root: 'w-[calc(12.67ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 8, className: { root: 'w-[calc(14.48ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 9, className: { root: 'w-[calc(16.29ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 10, className: { root: 'w-[calc(18.1ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 20, className: { root: 'w-[calc(36.2ex+0.5rem+14px+1.75rem)]' } },
    { size: 'medium', width: 30, className: { root: 'w-[calc(54.3ex+0.5rem+14px+1.75rem)]' } },

    { size: 'large', width: 1, className: { root: 'w-[calc(1.81ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 2, className: { root: 'w-[calc(3.62ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 3, className: { root: 'w-[calc(5.43ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 4, className: { root: 'w-[calc(7.24ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 5, className: { root: 'w-[calc(9.05ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 6, className: { root: 'w-[calc(10.86ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 7, className: { root: 'w-[calc(12.67ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 8, className: { root: 'w-[calc(14.48ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 9, className: { root: 'w-[calc(16.29ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 10, className: { root: 'w-[calc(18.1ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 20, className: { root: 'w-[calc(36.2ex+0.5rem+14px+1.9375rem)]' } },
    { size: 'large', width: 30, className: { root: 'w-[calc(54.3ex+0.5rem+14px+1.9375rem)]' } },

    { size: 'xlarge', width: 1, className: { root: 'w-[calc(1.81ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 2, className: { root: 'w-[calc(3.62ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 3, className: { root: 'w-[calc(5.43ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 4, className: { root: 'w-[calc(7.24ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 5, className: { root: 'w-[calc(9.05ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 6, className: { root: 'w-[calc(10.86ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 7, className: { root: 'w-[calc(12.67ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 8, className: { root: 'w-[calc(14.48ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 9, className: { root: 'w-[calc(16.29ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 10, className: { root: 'w-[calc(18.1ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 20, className: { root: 'w-[calc(36.2ex+0.5rem+14px+2.125rem)]' } },
    { size: 'xlarge', width: 30, className: { root: 'w-[calc(54.3ex+0.5rem+14px+2.125rem)]' } },
  ],
});
