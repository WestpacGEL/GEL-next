'use client';

import { DocumentElement } from '@keystatic/core';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container } from '@westpac/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useCallback } from 'react';

import { DOCUMENT_RENDERERS } from '@/components/document-renderer';

import { Tabs } from './components';

const TABS = [
  { label: 'Design', key: 'design' },
  { label: 'Accessibility', key: 'accessibility' },
  { label: 'Code', key: 'code' },
];

export function ContentTabs({ content }: { content: Record<string, DocumentElement[]> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';
  const tab = searchParams.get('tab') ?? 'design';

  const handleChange = useCallback(
    (key: Key) => {
      router.push(`${pathname}?brand=${brand}&tab=${key}`);
    },
    [brand, pathname, router],
  );

  return (
    <Tabs aria-label="GEL design system content" selectedKey={tab} onSelectionChange={handleChange}>
      {TABS.map(tab => (
        <Tabs.Panel title={tab.label} key={tab.key}>
          <div className="bg-light p-4">
            <Container>
              <DocumentRenderer
                document={content[tab.key as 'design' | 'accessibility' | 'code']}
                renderers={DOCUMENT_RENDERERS}
                componentBlocks={{}}
              />
            </Container>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
