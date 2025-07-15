'use client';

import { ReactNode } from 'react';

import { Container } from '@/app/design-system/components';

export function Section({ background, children }: { background?: boolean; children: ReactNode }) {
  return background ? (
    <section className="border-y border-y-border bg-background first:border-t-0 last:border-b-0">
      <Container tag="section" className="py-7 text-center sm:py-15">
        <>{children}</>
      </Container>
    </section>
  ) : (
    <Container tag="section" className="py-7 text-center sm:py-15">
      <>{children}</>
    </Container>
  );
}
