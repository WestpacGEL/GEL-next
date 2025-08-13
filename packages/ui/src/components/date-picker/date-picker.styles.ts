import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      input: 'border-border-muted-strong form-control flex items-center disabled:form-control-disabled',
      button:
        'border-l-border-muted-strong flex h-auto items-center justify-center rounded-l-none border-y-0 border-l border-r-0 bg-surface-muted-pale',
    },
    variants: {
      size: {
        small: {
          input: 'form-control-small gap-1.5',
          button: '-my-0.5 -mr-1.5 mb-[-0.25rem] min-h-5 py-[0.25rem]',
        },
        medium: {
          input: 'form-control-medium gap-2',
          button: 'my-[-0.3125rem] -mr-2 min-h-6 py-[0.3125rem]',
        },
        large: {
          input: 'form-control-large gap-2.5',
          button: 'my-[-0.5rem] -mr-2.5 min-h-7 py-[0.5rem]',
        },
        xlarge: {
          input: 'form-control-xlarge gap-3',
          button: '-my-1.5 -mr-3 mb-[-0.625rem] min-h-8 py-1.5',
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
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
