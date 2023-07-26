import { createReader } from '@keystatic/core/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { type GetStaticPropsContext, type InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';

import { DOCUMENT_RENDERERS } from '../../components/document-renderer/document-renderer';
import { Layout } from '../../components/layout/layout';
import config from '../../keystatic.config';

export async function getStaticPaths() {
  const reader = createReader(process.cwd(), config);
  // Get collection of all posts
  const componentSlugs = await reader.collections.components.list();
  return {
    // Generate paths for each post
    paths: componentSlugs.map((slug: string) => ({
      params: { component: slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.component as string;

  const reader = createReader(process.cwd(), config);
  const component = await reader.collections.components.readOrThrow(slug, {
    resolveLinkedFiles: true,
  });

  return {
    props: {
      component,
    },
  };
};

export type ComponentProps = InferGetStaticPropsType<typeof getStaticProps>['component'];

type ComponentDetailPageProps = {
  component: ComponentProps;
};

export default function ComponentDetailPage({ component }: ComponentDetailPageProps) {
  return (
    <div>
      <DocumentRenderer document={component.content} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
    </div>
  );
}
ComponentDetailPage.getLayout = function getLayout(page: ReactNode, brand: string) {
  return <Layout brand={brand}>{page}</Layout>;
};
