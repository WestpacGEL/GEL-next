'use client';

import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useCallback, useLayoutEffect, useMemo, useRef } from 'react';

import { AccessibilityContent, CodeContent, DesignContent, Tabs } from './components';
import { type ContentTabsProps } from './content-tabs.types';

const TabPanelByKey = ({ tabKey, content }: { content: ContentTabsProps; tabKey: string }) => {
  if (tabKey === 'design') {
    return (
      <DesignContent
        shortCodes={content.shortCodes}
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
        shortCodes={content.shortCodes}
        accessibilitySections={content.accessibilitySections}
        accessibilityDemo={content.accessibilityDemo}
      />
    );
  }
  if (tabKey === 'code') {
    return (
      <CodeContent
        shortCodes={content.shortCodes}
        componentName={content.componentName}
        namedExport={content.namedExport}
        subComponentProps={content.subComponentProps}
        componentProps={content.componentProps}
        westpacUIInfo={content.westpacUIInfo}
        codeSections={content.codeSections}
        description={content.description}
      />
    );
  }
  return <></>;
};

const FIXED_HEADER_Y = 162; // 228 - 66 = height to stick

export function ContentTabs({ content }: { content: ContentTabsProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';
  const tab = searchParams.get('tab') ?? 'design';

  const tabPanelRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to the element with the id of the focus query param.
   */
  useLayoutEffect(() => {
    const element = tabPanelRef.current?.querySelector(location.hash);
    element?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }, []);

  const handleChange = useCallback(
    (key: Key) => {
      const isLargeScreen = window.innerWidth > parseInt(BREAKPOINTS.lg, 10);
      router.push(`${pathname}?brand=${brand}&tab=${key}`, { scroll: !isLargeScreen });
      if (isLargeScreen && window.scrollY >= FIXED_HEADER_Y) {
        window.scrollTo({ top: FIXED_HEADER_Y });
      }
    },
    [brand, pathname, router],
  );

  const filteredTabs = useMemo(() => {
    return [
      ...(content.designSections?.length ? [{ label: 'Design', key: 'design' }] : []),
      ...(content.accessibilitySections.length > 0 ? [{ label: 'Accessibility', key: 'accessibility' }] : []),
      ...(content.componentProps || content.codeSections.length > 0 ? [{ label: 'Code', key: 'code' }] : []),
    ];
  }, [
    content.accessibilitySections.length,
    content.codeSections.length,
    content.componentProps,
    content.designSections?.length,
  ]);

  if (filteredTabs.length === 1) {
    return (
      <div className="flex-1 bg-background">
        <TabPanelByKey tabKey={filteredTabs[0].key} content={content} />
      </div>
    );
  }

  return (
    <Tabs aria-label="GEL design system content" selectedKey={tab} onSelectionChange={handleChange}>
      {filteredTabs.map(tab => (
        <Tabs.Panel title={tab.label} key={tab.key}>
          <div className="flex-1 bg-background" ref={tabPanelRef}>
            <TabPanelByKey tabKey={tab.key} content={tab.key === 'code' ? { ...content, description: '' } : content} />
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
