export const getIconSize = (size: string | object) => {
  const iconSizeMap: Record<string, string> = {
    small: 'xsmall',
    medium: 'small',
    large: 'small',
    xlarge: 'medium',
  };

  if (typeof size === 'string') {
    return iconSizeMap[size];
  } else {
    return Object.entries(size).reduce((acc, [key, val]) => ({ ...acc, [key]: iconSizeMap[val] }), {});
  }
};
