import React, { Suspense } from 'react';

import { reader } from '@/app/reader';

import { Header } from './components';

export default async function ComponentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { brand: string; component: string[] };
}) {
  const { brand, component } = params;
  const content = await reader().collections.designSystem.readOrThrow(component.join('/'));

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Header title={content.name} brand={brand} />
      </Suspense>
      <div className="flex flex-1 flex-col p-5">
        <div className="bg-surface-muted-pale -m-5 flex flex-1 flex-col focus:outline-none" id="content">
          {children}
        </div>
      </div>
    </>
  );
}
