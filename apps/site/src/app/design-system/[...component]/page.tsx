import { type ComponentProps } from '@westpac/ui';
import json from '@westpac/ui/component-type.json';
import { Metadata } from 'next';

import { reader } from '@/app/reader';

import { ContentTabs } from './components';
import { AccessibilitySectionProps } from './components/content-tabs/components/accessibility-content/accessibility-content.types';
import { DesignSectionProps } from './components/content-tabs/components/design-content/design-content.types';

type MetadataProps = {
  params: { component: string[] };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { component } = params;
  const content = await reader.collections.designSystem.readOrThrow(component.join('/'));

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
  const components = await reader.collections.designSystem.all();
  return components.map(component => ({
    component: component.slug.split('/'),
  }));
}

export default async function ComponentPage({ params }: { params: { component: string[] } }) {
  const { component } = params;
  const [content, westpacInfo] = await Promise.all([
    reader.collections.designSystem.readOrThrow(component.join('/')),
    reader.singletons.westpacUIInfo.readOrThrow(),
  ]);
  const componentName = component[1]
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

  const codeIsEmpty = code[0].children.length <= 1 && !code[0].children[0].text;

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
        code: codeIsEmpty ? undefined : code,
        description: content.description,
        designSections,
        relatedComponents: content.relatedInformation.filter(value => !!value) as string[],
        componentProps,
        subComponentProps,
      }}
    />
  );
}
