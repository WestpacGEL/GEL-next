import { Metadata } from 'next';

import { reader } from '@/app/reader';

import { ArticlePage } from './components/article-page/article-page.component';

export async function generateStaticParams() {
  const articles = await reader().collections.articles.all();

  return articles.map(article => ({
    article: article.slug,
  }));
}

type MetadataProps = {
  params: { article: string };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { article: articleParam } = params;
  const article = await reader().collections.articles.readOrThrow(articleParam);

  const title = `${article.name} | GEL Design System`;
  const description = article.description;
  const images = article.image ? [article.image.src] : [];

  return {
    title,
    description,
    authors: article.author ? [{ name: article.author }] : [],
    creator: article.author ? article.author : null,
    publisher: article.author ? article.author : null,
    openGraph: {
      title,
      images,
      authors: article.author ? [article.author] : [],
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt ? article.publishedAt : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

export default async function ArticleServerPage({ params }: { params: { article: string } }) {
  const { article: articleParam } = params;
  const article = await reader().collections.articles.readOrThrow(articleParam);

  const articleContent = await article.content();

  return <ArticlePage article={{ ...article, content: articleContent }} />;
}
