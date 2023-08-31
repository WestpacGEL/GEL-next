'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container, Tabs } from '@westpac/ui';

import { DOCUMENT_RENDERERS } from '@/components/document-renderer';

const TABS = [
  { label: 'Design', key: 'design' },
  { label: 'Accessibility', key: 'accessibility' },
  { label: 'Code', key: 'code' },
];

export function ComponentTabs({ content }) {
  return (
    <Tabs
      sticky
      stickyOffset={{ top: '60px' }}
      // selectedKey={tab}
      // onSelectionChange={handleChange}
      look="material"
      color="primary"
      className="flex-1"
    >
      {TABS.map(tab => (
        <Tabs.Panel title={<span className="px-4 py-1">{tab.label}</span>} key={tab.key}>
          <div className="-m-4 bg-light p-4">
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
