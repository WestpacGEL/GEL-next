import { type CloudImageProps } from '@keystatic/core/component-blocks';

export type Width = 'body' | 'bodyWide';

export type ArticleBodyImageProps = {
  image: CloudImageProps;
  title?: string;
  type?: Width;
};
