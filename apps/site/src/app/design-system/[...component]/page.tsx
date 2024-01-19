import { type ComponentProps } from '@westpac/ui';
import json from '@westpac/ui/component-type.json';
import { Metadata } from 'next';

import { reader } from '@/app/reader';
import { RelatedInfoLinks } from '@/components/related-info/related-info.types';
import { ShortCode } from '@/types/short-code.types';

import { ContentTabs } from './components';
import { AccessibilitySectionProps } from './components/content-tabs/components/accessibility-content/accessibility-content.types';
import { CodeSectionProps } from './components/content-tabs/components/code-content/code-content.types';
import { DesignSectionProps } from './components/content-tabs/components/design-content/design-content.types';

type MetadataProps = {
  params: { component: string[] };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { component } = params;
  const content = await reader().collections.designSystem.readOrThrow(component.join('/'));

  const title = `${content.name} | GEL Design System`;
  const description = content.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: content.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const components = await reader().collections.designSystem.all();
  return components.map(component => ({
    component: component.slug.split('/'),
  }));
}

export default async function ComponentPage({ params }: { params: { component: string[] } }) {
  const { component } = params;
  const [content, westpacInfo, shortCodes] = await Promise.all([
    reader().collections.designSystem.readOrThrow(component.join('/')),
    reader().singletons.westpacUIInfo.readOrThrow(),
    reader()
      .collections.shortCodes.all()
      .then(shortCodes =>
        Promise.all(
          shortCodes.map(
            shortCode =>
              new Promise<ShortCode>(resolve => {
                // eslint-disable-next-line promise/no-nesting
                return shortCode.entry.content().then(content => {
                  return resolve({
                    ...shortCode.entry,
                    content,
                  });
                });
              }),
          ),
        ),
      ),
  ]);

  const componentName = component?.[1]
    ?.split('-')
    .map(name => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join('');

  const [designSections, accessibilitySections, accessibilityDemo, codeSections, relatedArticles] = await Promise.all([
    Promise.all(
      content.design.map(section => {
        return new Promise<DesignSectionProps>((resolve, reject) => {
          return section
            .content()
            .then(content => {
              resolve({
                title: section.title.name,
                content: content,
                noTitle: section.noTitle,
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
                title: section.title.name,
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
    Promise.all(
      content.code.map(section => {
        return new Promise<CodeSectionProps>((resolve, reject) => {
          return section
            .content()
            .then(content => {
              resolve({
                title: section.title.name,
                content: content,
                noTitle: section.noTitle,
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
    content?.relatedArticles(),
  ]);

  const accessibilityIsEmpty = accessibilityDemo[0].children.length <= 1 && !accessibilityDemo[0].children[0].text;
  const relatedArticlesIsEmpty = relatedArticles[0].children.length <= 1 && !relatedArticles[0].children[0].text;

  const componentLookupKey = content.namedExport?.value?.name || componentName;
  const componentProps: ComponentProps | undefined = (json as any)[componentLookupKey];
  const subComponentProps = Object.entries(json).reduce((acc, [key, value]: [string, any]) => {
    if (key.indexOf(`${componentLookupKey}.`) !== 0) {
      return acc;
    }
    return [...acc, value];
  }, [] as ComponentProps[]);

  return (
    <ContentTabs
      content={{
        shortCodes,
        componentName: componentName,
        namedExport: content.namedExport?.value?.name,
        westpacUIInfo: westpacInfo,
        accessibilitySections,
        accessibilityDemo: accessibilityIsEmpty ? undefined : accessibilityDemo,
        codeSections,
        description: content.description,
        designSections,
        relatedArticles: relatedArticlesIsEmpty ? undefined : relatedArticles,
        relatedComponents: content.relatedComponents.filter(value => !!value) as RelatedInfoLinks[],
        componentProps,
        subComponentProps,
      }}
    />
  );
}
