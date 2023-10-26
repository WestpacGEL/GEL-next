import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { ArticlePage } from './components/article-page/article-page.component';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return { title: formatComponentSlug(slug) };
}

export default async function ArticleServerPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // TODO: Temporary solution since the reader api is not working on deploy version
  const article = (await reader.collections.articles.all()).find(article => article.slug === params.slug)?.entry;
  if (!article) {
    throw new Error(`Article ${slug} not found`);
  }
  // TODO: Try to make it work afterwords
  // const article = await reader.collections.articles.readOrThrow(slug);

  // const [articleContent, author] = await Promise.all([
  //   article.content(),
  //   article.author ? reader.collections.authors.read(article.author) : Promise.resolve(null),
  // ]);

  const [articleContent, authors] = await Promise.all([article.content(), reader.collections.authors.all()]);
  const author = authors.find(author => author.slug === article.author)?.entry;

  return <ArticlePage article={{ ...article, content: articleContent }} author={author || null} />;
}
