import { Article } from '@/types/article.types';

export type ArticleRowsProps = {
  articles: ArticleTileProps[];
  layout: '1x1' | '1x2' | '2x1' | '1x1x1';
};

export type ArticleTileProps = Omit<Article, 'content'> & {
  slug: string;
};

export type HomePageProps = {
  articleRows: ArticleRowsProps[];
};
