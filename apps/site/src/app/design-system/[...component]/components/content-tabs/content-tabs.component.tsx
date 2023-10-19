'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container } from '@westpac/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useCallback } from 'react';

import { AccessibilityContent, DesignContent, Tabs } from './components';
import { DOCUMENT_RENDERERS } from './components/document-renderer';
import { type ContentTabsProps } from './content-tabs.types';

const TABS = [
  { label: 'Design', key: 'design' },
  { label: 'Accessibility', key: 'accessibility' },
  { label: 'Code', key: 'code' },
] as const;

export function ContentTabs({ content }: { content: ContentTabsProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';
  const tab = searchParams.get('tab') ?? 'design';

  const handleChange = useCallback(
    (key: Key) => {
      return router.push(`${pathname}?brand=${brand}&tab=${key}`);
    },
    [brand, pathname, router],
  );

  return (
    <Tabs aria-label="GEL design system content" selectedKey={tab} onSelectionChange={handleChange}>
      {TABS.map(tab => (
        <Tabs.Panel title={tab.label} key={tab.key}>
          <div className="bg-background">
            {tab.key === 'design' && (
              <DesignContent
                description={content.description}
                designSections={content.designSections}
                relatedComponents={content.relatedComponents}
              />
            )}
            {tab.key === 'accessibility' && (
              <AccessibilityContent
                accessibilitySections={content.accessibilitySections}
                accessibilityDemo={content.accessibilityDemo}
              />
            )}
            {tab.key === 'code' && (
              <Container className="py-15">
                <DocumentRenderer document={content[tab.key]} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
              </Container>
            )}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
