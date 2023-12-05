import { type Width } from './article-body-image.types';

export const layoutMap: Record<Width, { span: object; start: object }> = {
  body: {
    span: {
      initial: 12,
      xsl: 10,
      md: 8,
    },
    start: {
      initial: 1,
      xsl: 2,
      md: 3,
    },
  },
  bodyWide: {
    span: {
      initial: 12,
      xsl: 10,
    },
    start: {
      initial: 1,
      xsl: 2,
    },
  },
};
