import { reader } from '../../reader';

import { Tabs } from './components';

export default async function ComponentPage({ params }: { params: { component: string } }) {
  const { component } = params;
  const content = await reader.collections.components.read(component[1]);

  if (!content) return <div>Component not found!</div>;

  const [design, accessibility, code] = await Promise.all([
    content?.design(),
    content?.accessibility(),
    content?.code(),
  ]);

  return <Tabs content={{ design, accessibility, code }} />;
}

// export async function generateStaticParams() {
//   const slugs = await reader.collections.components.list();
//   return slugs.map(slug => ({
//     slug,
//   }));
// }
