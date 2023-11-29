'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useCallback, useMemo } from 'react';

import { AccessibilityContent, CodeContent, DesignContent, Tabs } from './components';
import { type ContentTabsProps } from './content-tabs.types';

const TabPanelByKey = ({ tabKey, content }: { content: ContentTabsProps; tabKey: string }) => {
  if (tabKey === 'design') {
    return (
      <DesignContent
        description={content.description}
        designSections={content.designSections}
        relatedComponents={content.relatedComponents}
        relatedArticles={content.relatedArticles}
      />
    );
  }
  if (tabKey === 'accessibility') {
    return (
      <AccessibilityContent
        accessibilitySections={content.accessibilitySections}
        accessibilityDemo={content.accessibilityDemo}
      />
    );
  }
  if (tabKey === 'code') {
    return (
      <CodeContent
        subComponentProps={content.subComponentProps}
        componentProps={content.componentProps}
        westpacUIInfo={content.westpacUIInfo}
        content={content.code}
      />
    );
  }
  return <></>;
};

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

  const filteredTabs = useMemo(() => {
    return [
      ...(content.designSections?.length ? [{ label: 'Design', key: 'design' }] : []),
      ...(content.accessibilitySections.length > 0 ? [{ label: 'Accessibility', key: 'accessibility' }] : []),
      ...(content.componentProps || content.code ? [{ label: 'Code', key: 'code' }] : []),
    ];
  }, [content.accessibilitySections.length, content.code, content.componentProps, content.designSections?.length]);

  if (filteredTabs.length === 1) {
    return (
      <div className="bg-background">
        <TabPanelByKey tabKey={filteredTabs[0].key} content={content} />
      </div>
    );
  }

  return (
    <Tabs aria-label="GEL design system content" selectedKey={tab} onSelectionChange={handleChange}>
      {filteredTabs.map(tab => (
        <Tabs.Panel title={tab.label} key={tab.key}>
          <div className="bg-background">
            <TabPanelByKey tabKey={tab.key} content={content} />
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
