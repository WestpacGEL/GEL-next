'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { useMemo } from 'react';

import { Container } from '@/app/design-system/components';
import { Colors } from '@/components/component-blocks/colors/colors.component';
import { Icons } from '@/components/component-blocks/icons/icons.component';
import { Logos } from '@/components/component-blocks/logos/logos.component';
import { Pictograms } from '@/components/component-blocks/pictograms/pictograms.component';
import { Symbols } from '@/components/component-blocks/symbols/symbols.component';
import { Section } from '@/components/content-blocks/section';
import { Code, Heading } from '@/components/document-renderer';
import { RelatedInfo } from '@/components/related-info';

import { Intro } from '..';
import { DOCUMENT_RENDERERS } from '../document-renderer';

import { type DesignContentProps } from '.';

export function DesignContent({ designSections, description, relatedComponents, relatedArticles }: DesignContentProps) {
  const sectionNames = useMemo(() => {
    return designSections?.filter(({ noTitle }) => !noTitle).map(({ title }) => ({ title })) || [];
  }, [designSections]);

  return (
    <>
      {description && <Intro description={description} sectionNames={sectionNames} />}
      {designSections?.map(({ title, content, noTitle }) => {
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
                    code: props => <Code className="mb-5 mt-4" enableLiveCode={false} {...props} />,
                  },
                }}
                componentBlocks={{
                  icons: () => <Icons />,
                  logos: () => <Logos />,
                  pictograms: () => <Pictograms />,
                  symbols: () => <Symbols />,
                  colors: props => <Colors palette={props.palette} />,
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
