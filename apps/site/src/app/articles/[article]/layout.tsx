import { ReactNode } from 'react';

import { Header } from './components';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gel-background text-gel-text pb-8" data-brand="wbc">
      <Header />
      <main>{children}</main>
    </div>
  );
}
