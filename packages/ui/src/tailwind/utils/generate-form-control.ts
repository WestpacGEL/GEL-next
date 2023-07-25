export const generateFormControlComponents = (formControlProps: {
  base: string;
  disabled: string;
  sizes: Record<string, string>;
}) => {
  const sizes = Object.entries(formControlProps.sizes).reduce((acc, [size, value]) => {
    return {
      ...acc,
      [`.form-control-${size}`]: {
        [`@apply ${value}`]: {},
      },
    };
  }, {} as Record<string, any>);
  return {
    '.form-control': {
      [`@apply ${formControlProps.base}`]: {},
    },
    ...sizes,
    '.form-control-disabled': {
      [`@apply ${formControlProps.disabled}`]: {},
    },
    '.no-inner-spin-button::-webkit-outer-spin-button, .no-inner-spin-button::-webkit-inner-spin-button': {
      margin: '0',
      appearance: 'none',
    },
  };
};
