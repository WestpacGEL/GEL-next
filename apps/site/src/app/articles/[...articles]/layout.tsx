import { Header } from './components';

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[49px] bg-[#F3F5F6]">
      <Header />
      <main>{children}</main>
    </div>
  );
}
