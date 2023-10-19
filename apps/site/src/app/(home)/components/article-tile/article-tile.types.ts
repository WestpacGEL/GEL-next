import { Article } from '@/types/article.types';

export type ArticleTileProps = {
  article: Omit<Article, 'content'>;
  className?: string;
  slug?: string;
};
