import { Header } from './components';

export default function ComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col p-5">
        <div className="-m-5 flex flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
