import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { ArticlePage } from './components/article-page/article-page.component';

export function generateMetadata({ params }: { params: { article: string } }) {
  const { article } = params;
  return { title: formatComponentSlug(article[article.length - 1]) };
}

export default async function ArticleServerPage({ params }: { params: { article: string } }) {
  const { article: articleParam } = params;
  const article = await reader.collections.articles.readOrThrow(articleParam);

  const [articleContent, author] = await Promise.all([
    article.content(),
    article.author ? reader.collections.authors.read(article.author) : Promise.resolve(null),
  ]);

  return <ArticlePage article={{ ...article, content: articleContent }} author={author} />;
}
