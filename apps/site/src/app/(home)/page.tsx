import { reader } from '@/app/reader';

import { ActionBar, Footer, Hero, HomePage as HomePageContent } from './components';
import { type ArticleRowsProps } from './components/home-page/home-page.types';

export default async function Homepage() {
  const [urls, home] = await Promise.all([reader().singletons.url.read(), reader().singletons.homePage.readOrThrow()]);
  const articleRows = await Promise.all(
    home.articleRows.map(row => {
      return new Promise<ArticleRowsProps>((resolve, reject) => {
        Promise.all(
          row.articles.map(articleSlug =>
            reader()
              .collections.articles.read(articleSlug || '')
              .then(article => ({ ...article, content: null, slug: articleSlug })),
          ),
        )
          .then(articles => {
            return resolve({
              ...row,
              articles,
            } as ArticleRowsProps);
          })
          .catch(error => {
            reject(error);
          });
      });
    }),
  );

  return (
    <main className="font-gel-sans text-gel-text pb-8">
      <Hero />
      <ActionBar />
      <HomePageContent articleRows={articleRows} />
      <Footer gelEmail={urls?.gelEmail ?? ''} guidelinesURL={urls?.guidelines ?? ''} />
    </main>
  );
}
