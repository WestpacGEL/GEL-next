import { Article } from '@/types/article.types';
import { Author } from '@/types/author.types';

export type ArticlePageProps = {
  article: Article;
  author: Author | null;
};
