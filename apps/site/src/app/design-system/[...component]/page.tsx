import { type ComponentProps } from '@westpac/ui';
import json from '@westpac/ui/component-type.json';
import { useMemo } from 'react';

import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { ContentTabs } from './components';
import { AccessibilitySectionProps } from './components/content-tabs/components/accessibility-content/accessibility-content.types';
import { DesignSectionProps } from './components/content-tabs/components/design-content/design-content.types';

export function generateMetadata({ params }: { params: { component: string } }) {
  const { component } = params;
  return { title: formatComponentSlug(component[component.length - 1]) };
}

export default async function ComponentPage({ params }: { params: { component: string[] } }) {
  const { component } = params;
  const [content, westpacInfo] = await Promise.all([
    reader.collections.designSystem.read(component.join('/')),
    reader.singletons.westpacUIInfo.readOrThrow(),
  ]);
  const componentName = component[1]
    .split('-')
    .map(name => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join('');

  if (!content) return <div>Component not found!</div>;

  const [designSections, accessibilitySections, accessibilityDemo, code] = await Promise.all([
    Promise.all(
      content.design.map(section => {
        return new Promise<DesignSectionProps>((resolve, reject) => {
          return section
            .content()
            .then(content => {
              resolve({
                title: section.title,
                content: content,
              });
              return {
                ...section,
                content,
              };
            })
            .catch((error: any) => {
              reject(error);
            });
        });
      }),
    ),
    Promise.all(
      content.accessibility.map(section => {
        return new Promise<AccessibilitySectionProps>((resolve, reject) => {
          return section
            .content()
            .then(content => {
              resolve({
                title: section.title,
                content: content,
              });
              return {
                ...section,
                content,
              };
            })
            .catch((error: any) => {
              reject(error);
            });
        });
      }),
    ),
    content?.accessibilityDemo(),
    content?.code(),
  ]);
  const componentProps: ComponentProps | undefined = (json as any)[componentName];
  const subComponentProps = Object.entries(json).reduce((acc, [key, value]: [string, ComponentProps]) => {
    if (key.indexOf(`${componentName}.`) !== 0) {
      return acc;
    }
    return [...acc, value];
  }, [] as ComponentProps[]);

  return (
    <ContentTabs
      content={{
        westpacUIInfo: westpacInfo,
        accessibilitySections,
        accessibilityDemo,
        code,
        description: content.description,
        pageOfContent: content.pageOfContent.concat(),
        designSections,
        relatedComponents: content.relatedInformation.filter(value => !!value) as string[],
        componentProps,
        subComponentProps,
      }}
    />
  );
}
