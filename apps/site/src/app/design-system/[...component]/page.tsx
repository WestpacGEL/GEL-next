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
  const content = await reader.collections.designSystem.read(component.join('/'));
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

  return (
    <ContentTabs
      content={{
        accessibilitySections,
        accessibilityDemo,
        code,
        description: content.description,
        pageOfContent: content.pageOfContent.concat(),
        designSections,
        relatedComponents: content.relatedInformation.filter(value => !!value) as string[],
      }}
    />
  );
}
