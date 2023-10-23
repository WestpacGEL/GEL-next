import { reader } from '@/app/reader';

import { ActionBar, Footer, Hero, HomePage as HomePageContent } from './components';

export default async function Homepage() {
  const urls = await reader.singletons.url.read();
  const articles = (await reader.collections.articles.all()).map(article => ({
    ...article,
    entry: { ...article.entry, content: null },
  }));

  return (
    <main className="pb-8 font-gel-sans">
      <Hero />
      <ActionBar />
      <HomePageContent articles={articles} />
      <Footer gelEmail={urls?.gelEmail ?? ''} guidelinesURL={urls?.guidelines ?? ''} />
    </main>
  );
}
