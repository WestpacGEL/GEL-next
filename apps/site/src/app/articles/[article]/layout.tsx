import { ReactNode } from 'react';

import { Header } from './components';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gel-background pb-8 text-gel-text">
      <Header />
      <main>{children}</main>
    </div>
  );
}
