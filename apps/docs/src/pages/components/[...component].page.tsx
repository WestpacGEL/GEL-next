import { createReader } from '@keystatic/core/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { Tabs } from '@westpac/ui';
import { BrandKey } from '@westpac/ui/tailwind';
import { type GetStaticPropsContext, type InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { Key, useCallback } from 'react';

import { DOCUMENT_RENDERERS } from '../../components/document-renderer/document-renderer';
import { Layout } from '../../components/layout/layout';
import config from '../../keystatic.config';

const TABS = [
  { label: 'Design', key: 'design' },
  { label: 'Accessibility', key: 'accessibility' },
  { label: 'Code', key: 'code' },
];
export async function getStaticPaths() {
  const reader = createReader(process.cwd(), config);
  // Get collection of all posts
  const componentSlugs = await reader.collections.components.list();
  return {
    // Generate paths for each post
    paths: componentSlugs.reduce(
      (acc: { params: { component: string[] } }[], slug: string) => [
        ...acc,
        {
          params: { component: [slug] },
        },
        ...TABS.map(tab => ({
          params: { component: [slug, tab.key] },
        })),
      ],
      [],
    ),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const [slug, tab] = params?.component as string[];

  const reader = createReader(process.cwd(), config);
  const component = await reader.collections.components.readOrThrow(slug, {
    resolveLinkedFiles: true,
  });

  return {
    props: {
      component,
      tab: tab ?? 'design',
    },
  };
};

export type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>['component'];

type ComponentDetailPageProps = {
  brand: BrandKey;
  component: ComponentProps;
  tab: string;
};

export default function ComponentDetailPage({ component, brand, tab }: ComponentDetailPageProps) {
  const router = useRouter();
  const handleChange = useCallback(
    (key: Key) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          component: [router.query.component![0], key as string],
        },
      });
    },
    [router],
  );

  return (
    <Layout headerProps={{ title: component.name }} brand={brand}>
      <div className="-m-5 flex flex-1 flex-col">
        <Tabs
          sticky
          stickyOffset={{ top: '60px' }}
          selectedKey={tab}
          onSelectionChange={handleChange}
          look="material"
          color="primary"
          className="flex-1"
        >
          {TABS.map(tab => (
            <Tabs.Panel title={<span className="px-4 py-1">{tab.label}</span>} key={tab.key}>
              <div className="-m-4 bg-light p-4">
                <DocumentRenderer
                  document={component[tab.key as 'design' | 'accessibility' | 'code']}
                  renderers={DOCUMENT_RENDERERS}
                  componentBlocks={{}}
                />
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
