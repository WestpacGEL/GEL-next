import { reader } from '@/app/reader';

import { ArticlePage } from './components/article-page/article-page.component';

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all();

  return articles.map(article => ({
    article: article.slug,
  }));
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
