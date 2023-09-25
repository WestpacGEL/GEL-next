import { reader } from '@/app/reader';

import { ActionBar, Footer, Hero } from './components';
import { Content } from './content';

export default async function Homepage() {
  const urls = await reader.singletons.url.read();
  return (
    <main className="pb-8">
      <Hero />
      <ActionBar />
      <Content />
      <Footer gelEmail={urls.gelEmail} guidelinesURL={urls.guidelines} />
    </main>
  );
}
