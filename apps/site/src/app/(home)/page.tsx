import { reader } from '@/app/reader';

import { ActionBar, Footer, Hero, HomePage as HomePageContent } from './components';
import { type ArticleRowsProps } from './components/home-page/home-page.types';

async function fetchArticle(articleSlug: string) {
  const r = await reader();
  const article = await r.collections.articles.read(articleSlug || '');
  return { ...article, content: null, slug: articleSlug };
}

export default async function Homepage() {
  const [urls, home] = await Promise.all([
    (await reader()).singletons.url.read(),
    (await reader()).singletons.homePage.readOrThrow(),
  ]);
  const articleRows = await Promise.all(
    home.articleRows.map(async row => {
      const articles = await Promise.all(row.articles.map(articleSlug => fetchArticle(articleSlug as string)));
      return {
        ...row,
        articles,
      } as ArticleRowsProps;
    }),
  );

  return (
    <main className="pb-8 font-gel-sans text-gel-text" data-brand="wbc">
      <Hero />
      <ActionBar />
      <HomePageContent articleRows={articleRows} />
      <Footer gelEmail={urls?.gelEmail ?? ''} guidelinesURL={urls?.guidelines ?? ''} />
    </main>
  );
}
