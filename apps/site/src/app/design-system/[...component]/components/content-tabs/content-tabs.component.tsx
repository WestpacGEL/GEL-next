'use client';

import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useCallback, useEffect, useMemo } from 'react';

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

const HEADER_HEIGHT = {
  sm: 150,
  lg: 200,
};

const FIXED_HEADER_Y = 162; // 228 - 66 = height to stick

export function ContentTabs({ content }: { content: ContentTabsProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';
  const tab = searchParams.get('tab') ?? 'design';

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

  useEffect(() => {
    // TODO: the scroll is not working well since we are not waiting for the iframes to be loaded.
    const viewport = window.innerWidth < parseInt(BREAKPOINTS.md, 10) ? 'sm' : 'lg';
    const hashSelector = window.location.hash;
    if (!hashSelector) {
      return;
    }
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = document?.querySelector(hashSelector || '')?.getBoundingClientRect();
    const offset = (elemRect?.top || 0) - bodyRect.top - HEADER_HEIGHT[viewport];
    window?.scrollTo({ top: offset, behavior: 'smooth' });
  }, [pathname]);

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
          <div className="flex-1 bg-background">
            <TabPanelByKey tabKey={tab.key} content={tab.key === 'code' ? { ...content, description: '' } : content} />
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
