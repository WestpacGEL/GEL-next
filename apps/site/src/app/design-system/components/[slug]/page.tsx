import { type ComponentProps } from '@westpac/ui';
import json from '@westpac/ui/component-type.json';

import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { ContentTabs } from './components';
import { AccessibilitySectionProps } from './components/content-tabs/components/accessibility-content/accessibility-content.types';
import { DesignSectionProps } from './components/content-tabs/components/design-content/design-content.types';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return { title: formatComponentSlug(slug) };
}

export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // const [content, westpacInfo] = await Promise.all([
  const [allComponents, westpacInfo] = await Promise.all([
    // TODO: Try to make it work this way afterwards
    // reader.collections.designSystem.readOrThrow(slug),
    reader.collections.designSystem.all(),
    reader.singletons.westpacUIInfo.readOrThrow(),
  ]);
  // TODO: Temporary solution since the reader api is not working on deploy version
  const content = allComponents.find(component => component.slug === slug)?.entry;
  if (!content) {
    throw new Error(`Component: ${slug} not found`);
  }

  const componentName = slug
    .split('-')
    .map(name => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join('');

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
  const subComponentProps = Object.entries(json).reduce((acc, [key, value]: [string, any]) => {
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
