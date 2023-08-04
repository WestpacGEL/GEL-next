export const getGetParameters = (url: string): Record<string, string> => {
  const searchParams = url.replace(/.+\?/gi, '');
  return searchParams.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

export const getPathWithoutGetParameters = (url: string): string => {
  return url.match(/(.+)\?/i)?.[1] ?? url;
};
