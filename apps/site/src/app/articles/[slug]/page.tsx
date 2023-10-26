import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { ArticlePage } from './components/article-page/article-page.component';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return { title: formatComponentSlug(slug) };
}

export default async function ArticleServerPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await reader.collections.articles.readOrThrow(slug);

  const [articleContent, author] = await Promise.all([
    article.content(),
    article.author ? reader.collections.authors.read(article.author) : Promise.resolve(null),
  ]);

  return <ArticlePage article={{ ...article, content: articleContent }} author={author} />;
}
