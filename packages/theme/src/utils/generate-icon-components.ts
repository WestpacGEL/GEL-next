export const generateIconComponents = (iconSizes: Record<string, string>) => {
  const defaultIconSize = {
    '.icon': {
      [`@apply ${iconSizes.medium}`]: {},
    },
  };
  return Object.entries(iconSizes).reduce((acc, [size, value]) => {
    return {
      ...acc,
      [`.icon-size-${size}`]: {
        [`@apply ${value}`]: {},
      },
    };
  }, defaultIconSize);
};
