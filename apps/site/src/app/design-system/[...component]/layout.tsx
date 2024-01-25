import React, { Suspense } from 'react';

import { reader } from '@/app/reader';

import { Header } from './components';

export default async function ComponentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { component: string[] };
}) {
  const { component } = params;
  const content = await reader().collections.designSystem.readOrThrow(component.join('/'));

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Header title={content.name} />
      </Suspense>
      <div className="flex flex-1 flex-col p-5" id="content">
        <div className="-m-5 flex flex-1 flex-col bg-background">{children}</div>
      </div>
    </>
  );
}
