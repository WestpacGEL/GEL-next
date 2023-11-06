import { type Article } from '@/types/article.types';

import { type ArticleRowsProps } from '../home-page/home-page.types';

export type ArticleTileProps = {
  article: Omit<Article, 'content'>;
  className?: string;
  index: number;
  layout: ArticleRowsProps['layout'];
  slug?: string;
};
