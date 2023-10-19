import { Header } from './components';

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[3.0625rem] bg-gel-background">
      <Header />
      <main>{children}</main>
    </div>
  );
}
