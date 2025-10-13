'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { useMemo } from 'react';

import { Container } from '@/app/design-system/components';
import { ShortCode } from '@/components/component-blocks/components/short-code';
import { foundationBlocksComponents } from '@/components/component-blocks/foundation-blocks';
import { Section } from '@/components/content-blocks/section';
import { Code, Heading } from '@/components/document-renderer';
import { RelatedInfo } from '@/components/related-info';

import { Intro } from '..';
import { DOCUMENT_RENDERERS } from '../document-renderer';

import { type DesignContentProps } from '.';

export function DesignContent({
  designSections,
  description,
  relatedComponents,
  relatedArticles,
  shortCodes,
}: DesignContentProps) {
  const sectionNames = useMemo(() => {
    return designSections?.filter(({ noTitle }) => !noTitle).map(({ title }) => ({ title })) || [];
  }, [designSections]);

  return (
    <>
      {description && <Intro description={description} sectionNames={sectionNames} />}
      {designSections?.map(({ title, content, noTitle, noDemo }) => {
        const id = title.toLowerCase().split(' ').join('-');
        return (
          <Section key={id}>
            <Container>
              {!noTitle && <Heading level={2}>{title}</Heading>}
              <DocumentRenderer
                document={content}
                renderers={{
                  ...DOCUMENT_RENDERERS,
                  block: {
                    ...DOCUMENT_RENDERERS.block,
                    code: props => (
                      <Code className="mt-4 mb-5" enableLiveCode={false} showResponsiveDemo={!noDemo} {...props} />
                    ),
                  },
                }}
                componentBlocks={{
                  ...foundationBlocksComponents,
                  shortCode: props => {
                    return <ShortCode shortCodes={shortCodes} {...props} />;
                  },
                }}
              />
            </Container>
          </Section>
        );
      })}
      {(!!relatedComponents?.length || !!relatedArticles?.length) && (
        <RelatedInfo relatedComponents={relatedComponents} relatedArticles={relatedArticles} />
      )}
    </>
  );
}
