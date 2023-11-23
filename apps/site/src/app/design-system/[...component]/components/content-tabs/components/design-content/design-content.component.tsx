'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container } from '@westpac/ui';
import { useMemo } from 'react';

import { Colors } from '@/components/component-blocks/colors/colors.component';
import { Icons } from '@/components/component-blocks/icons/icons.component';
import { Logos } from '@/components/component-blocks/logos/logos.component';
import { Pictograms } from '@/components/component-blocks/pictograms/pictograms.component';
import { Section } from '@/components/content-blocks/section';
import { Code, Heading } from '@/components/document-renderer';
import { RelatedInfo } from '@/components/related-info';

import { Intro } from '..';
import { DOCUMENT_RENDERERS } from '../document-renderer';

import { type DesignContentProps } from '.';

export function DesignContent({ designSections, description, relatedComponents }: DesignContentProps) {
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
                    code: props => <Code className="my-4" enableLiveCode={false} {...props} />,
                  },
                }}
                componentBlocks={{
                  icons: () => <Icons />,
                  logos: () => <Logos />,
                  pictograms: () => <Pictograms />,
                  colors: props => <Colors palette={props.palette} />,
                }}
              />
            </Container>
          </Section>
        );
      })}
      {!!relatedComponents?.length && <RelatedInfo relatedComponents={relatedComponents} />}
    </>
  );
}
