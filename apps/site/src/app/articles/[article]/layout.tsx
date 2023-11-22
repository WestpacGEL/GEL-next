import { Header } from './components';

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gel-background pb-8">
      <Header />
      <main>{children}</main>
    </div>
  );
}
