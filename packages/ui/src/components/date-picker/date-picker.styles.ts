import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    input: 'form-control flex items-center border-border-muted-strong disabled:form-control-disabled',
    button:
      'flex h-auto items-center justify-center rounded-l-none border-y-0 border-r-0 border-l border-l-border-muted-strong bg-surface-muted-pale',
    dateField: 'flex-1',
  },
  variants: {
    size: {
      small: {
        input: 'gap-1.5 form-control-small',
        button: '-my-0.5 -mr-1.5 mb-[-0.25rem] min-h-5 py-[0.25rem]',
      },
      medium: {
        input: 'gap-2 form-control-medium',
        button: 'my-[-0.3125rem] -mr-2 min-h-6 py-[0.3125rem]',
      },
      large: {
        input: 'gap-2.5 form-control-large',
        button: 'my-[-0.5rem] -mr-2.5 min-h-7 py-[0.5rem]',
      },
      xlarge: {
        input: 'gap-3 form-control-xlarge',
        button: '-my-1.5 -mr-3 mb-[-0.625rem] min-h-8 py-1.5',
      },
    },
    block: {
      true: {
        input: 'w-full',
      },
      false: {
        input: '',
      },
    },
    isInvalid: {
      true: {
        input: 'border-border-danger',
      },
      false: {},
    },
    isDisabled: {
      true: {
        input: 'form-control-disabled',
      },
      false: {},
    },
  },
});
