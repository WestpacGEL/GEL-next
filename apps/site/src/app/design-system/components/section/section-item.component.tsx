'use client';

import { Item } from '@westpac/ui';

export function SectionItem({ className, children, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <Item
      className={className}
      span={{ initial: 10, xsl: 12, sm: 10 }}
      start={{ initial: 2, xsl: 1, sm: 2 }}
      {...props}
    >
      <>{children}</>
    </Item>
  );
}
