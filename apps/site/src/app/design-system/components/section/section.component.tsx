'use client';

import { ReactNode } from 'react';

import { Container } from '@/app/design-system/components';

export function Section({ background, children }: { background?: boolean; children: ReactNode }) {
  return background ? (
    <section className="border-y-border-muted-soft bg-surface-muted-pale border-y first:border-t-0 last:border-b-0">
      <Container className="py-7 text-center sm:py-15">
        <>{children}</>
      </Container>
    </section>
  ) : (
    <Container tag="section" className="py-7 text-center sm:py-15">
      <>{children}</>
    </Container>
  );
}
