import { type CloudImageProps } from '@keystatic/core/component-blocks';

export type ArticleImageProps = {
  caption?: string;
  image: CloudImageProps;
  index: number;
  spacing?: 'default' | 'reduced';
};
