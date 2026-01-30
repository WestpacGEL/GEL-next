import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    input: 'form-control flex items-center border-0',
    dateField: 'rounded rounded-r-none border border-r-0 border-border-muted-strong',
    button: 'flex items-center justify-center rounded-l-none border-border-muted-strong bg-surface-muted-pale',
  },
  variants: {
    size: {
      small: {
        input: 'max-h-5',
        dateField: 'h-5 form-control-small',
      },
      medium: {
        input: 'max-h-6',
        dateField: 'h-6 form-control-medium',
      },
      large: {
        input: 'max-h-7',
        dateField: 'h-7 form-control-large',
      },
      xlarge: {
        input: 'max-h-8',
        dateField: 'h-8 form-control-xlarge',
      },
    },
    block: {
      true: {
        input: 'w-full gap-0',
        dateField: 'w-full',
      },
    },
    isInvalid: {
      true: {
        dateField: 'border-border-danger',
        button: 'border-border-danger border-l-border-muted-strong',
      },
      false: {},
    },
    isDisabled: {
      true: {
        dateField: '!form-control-disabled',
      },
      false: {},
    },
    isReadOnly: {
      true: {
        dateField: '!form-control-disabled',
      },
      false: {},
    },
  },
});
