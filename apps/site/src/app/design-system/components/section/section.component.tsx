'use client';

import { Container } from '@/app/design-system/components';

export function Section({ background, children }: { background?: boolean; children: React.ReactNode }) {
  return background ? (
    <section className="bg-background">
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
