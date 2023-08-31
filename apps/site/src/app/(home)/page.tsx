import { ActionBar, Footer, Hero } from './components';
import { Content } from './content';

export default async function Homepage() {
  return (
    <main className="pb-8">
      <Hero />
      <ActionBar />
      <Content />
      <Footer />
    </main>
  );
}
