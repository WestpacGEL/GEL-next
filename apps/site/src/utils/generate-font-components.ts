import { PluginAPI } from 'tailwindcss/types/config';

export const generateFontComponents = (
  typographySizes: Record<string, { fontSize: string; lineHeight: string }>,
  theme: PluginAPI['theme'],
) => {
  return Object.entries(typographySizes).reduce((acc, [size, value]) => {
    return {
      ...acc,
      [`.typography-site-${size}`]: {
        fontSize: theme(`fontSize.body-${size}`),
        lineHeight: theme(`lineHeight.${value.lineHeight}`),
        fontFamily: theme(`fontFamily.gel-sans`),
      },
    };
  }, {} as Record<string, any>);
};
