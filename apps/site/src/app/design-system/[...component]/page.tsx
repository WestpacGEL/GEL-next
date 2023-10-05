import { reader } from '@/app/reader';
import { formatComponentSlug } from '@/utils/format';

import { Tabs } from './components';

export function generateMetadata({ params }: { params: { component: string } }) {
  const { component } = params;
  return { title: formatComponentSlug(component[component.length - 1]) };
}

export default async function ComponentPage({ params }: { params: { component: string[] } }) {
  const { component } = params;
  const content = await reader.collections.designSystem.read(component.join('/'));
  if (!content) return <div>Component not found!</div>;

  const [design, accessibility, code] = await Promise.all([
    content?.design(),
    content?.accessibility(),
    content?.code(),
  ]);

  return <Tabs content={{ design, accessibility, code }} />;
}
