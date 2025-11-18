import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'relative flex flex-col gap-1',
    popover: 'mt-1 shadow',
    label: 'block text-left text-sm font-medium text-gray-700',
    control: 'form-control relative inline-flex w-full flex-row overflow-hidden rounded-md',
    input: 'w-full outline-none',
    selection: 'flex-1 text-left',
    hint: 'typography-body-10 text-text-muted',
    searchInputWrapper: 'border-b border-b-border-muted-soft p-2',
    button:
      'flex cursor-default items-center justify-center border-l border-l-border-muted-strong bg-background-white-faint px-1',
    icon: 'h-5 w-5',
  },
  variants: {
    size: {
      small: {
        control:
          'min-h-[2.3125rem] form-control-small group-[.input-group-inset-after]:pr-6 group-[.input-group-inset-before]:pl-6',
        button: '-mt-0.5 -mr-[0.5625rem] -mb-[0.25rem]',
      },
      medium: {
        control:
          'min-h-[2.5rem] form-control-medium group-[.input-group-inset-after]:pr-7 group-[.input-group-inset-before]:pl-7',
        button: '-my-[0.3125rem] -mr-2',
      },
      large: {
        control:
          'min-h-[2.875rem] form-control-large group-[.input-group-inset-after]:pr-8 group-[.input-group-inset-before]:pl-8',
        button: '-my-[0.5rem] -mr-2.5',
      },
      xlarge: {
        control:
          'min-h-[3.0625rem] form-control-xlarge group-[.input-group-inset-after]:pr-9 group-[.input-group-inset-before]:pl-9',
        button: '-mt-[0.5625rem] -mr-3 -mb-[0.625rem]',
      },
    },
    invalid: {
      true: {
        control: 'border-border-danger',
      },
      false: {
        control: 'border-border-muted-strong',
      },
    },
    isFocusVisible: {
      true: {
        control: 'focus-outline',
      },
    },
    width: {
      full: { control: 'w-full' },
      1: { control: 'box-content w-[1.81ex]' },
      2: { control: 'box-content w-[3.62ex]' },
      3: { control: 'box-content w-[5.43ex]' },
      4: { control: 'box-content w-[7.24ex]' },
      5: { control: 'box-content w-[9.05ex]' },
      6: { control: 'box-content w-[10.86ex]' },
      7: { control: 'box-content w-[12.67ex]' },
      8: { control: 'box-content w-[14.48ex]' },
      9: { control: 'box-content w-[16.29ex]' },
      10: { control: 'box-content w-[18.1ex]' },
      20: { control: 'box-content w-[36.2ex]' },
      30: { control: 'box-content w-[54.3ex]' },
    },
  },
});
