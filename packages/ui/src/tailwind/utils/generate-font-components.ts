import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config.js';

export const generateFontComponents = (
  typographySizes: Record<string, { fontSize: string; lineHeight: string }>,
  theme: PluginAPI['theme'],
) => {
  return Object.entries(typographySizes).reduce((acc, [size, value]) => {
    return {
      ...acc,
      [`.typography-body-${size}`]: {
        fontSize: theme(`fontSize.body-${size}`),
        lineHeight: theme(`lineHeight.${value.lineHeight}`),
        fontFamily: theme(`fontFamily.sans`),
      },
      [`.typography-brand-${size}`]: {
        fontSize: theme(`fontSize.brand-${size}`),
        lineHeight: theme(`lineHeight.${value.lineHeight}`),
        fontFamily: theme(`fontFamily.brand`),
      },
    };
  }, {} as CSSRuleObject[]);
};
