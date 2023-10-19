import { Article } from '@/types/article.types';

export type HomePageProps = {
  articles: {
    entry: Omit<Article, 'content'>;
    slug: string;
  }[];
};
