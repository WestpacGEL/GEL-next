import { tv } from 'tailwind-variants';

// eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
export const styles = tv(
  {
    slots: {
      buttonContainer: 'relative w-full',
      control: 'form-control relative box-border inline-flex w-full flex-row overflow-hidden rounded-md',
      selection: 'flex flex-1 items-center overflow-hidden whitespace-nowrap pr-4.5 text-left',
      selectionSpan: 'w-full overflow-hidden text-ellipsis',
      hint: 'typography-body-10 text-muted',
      button: 'flex cursor-default items-center justify-center border-l border-l-borderDark bg-white',
      clearButton: 'absolute inset-y-0 flex !h-auto items-center justify-center',
      clearIcon: '-mt-0.5',
    },
    variants: {
      size: {
        small: {
          control:
            'form-control-small min-h-5 group-[.input-group-inset-after]:pr-6 group-[.input-group-inset-before]:pl-6',
          button: '-mb-[0.25rem] -mr-1.5 -mt-0.5 px-0.5',
          clearButton: 'right-6.5',
        },
        medium: {
          control:
            'form-control-medium min-h-6 group-[.input-group-inset-after]:pr-7 group-[.input-group-inset-before]:pl-7',
          button: '-my-[0.3125rem] -mr-2 px-1.5',
          clearButton: 'right-8.5',
        },
        large: {
          control:
            'form-control-large min-h-7 group-[.input-group-inset-after]:pr-8 group-[.input-group-inset-before]:pl-8',
          button: '-my-[0.5rem] -mr-2.5 px-1.5',
          clearButton: 'right-8.5',
        },
        xlarge: {
          control:
            'form-control-xlarge min-h-8 group-[.input-group-inset-after]:pr-9 group-[.input-group-inset-before]:pl-9',
          button: '-mb-[0.625rem] -mr-3 -mt-1.5 px-2',
          clearButton: 'right-9.5',
        },
      },
      invalid: {
        true: {
          control: 'border-danger',
        },
        false: {
          control: 'border-borderDark',
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
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
