'use client';

import { GridItem } from '@westpac/ui';
import { ReactNode } from 'react';

export function SectionItem({ className, children, ...props }: { children: ReactNode; className?: string }) {
  return (
    <GridItem
      className={className}
      span={{ initial: 10, xsl: 12, sm: 10 }}
      start={{ initial: 2, xsl: 1, sm: 2 }}
      {...props}
    >
      <>{children}</>
    </GridItem>
  );
}
