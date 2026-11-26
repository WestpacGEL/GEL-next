'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';

import { Container } from '@/app/design-system/components';
import { ShortCode } from '@/components/component-blocks/components/short-code';
import { foundationBlocksComponents } from '@/components/component-blocks/foundation-blocks';
import { Section } from '@/components/content-blocks/section';
import { Code, Heading } from '@/components/document-renderer';

import { DOCUMENT_RENDERERS } from '../document-renderer';

import { type ContentGuidanceProps } from './content-guidance.types';

export function ContentGuidance({ contentSections, shortCodes }: ContentGuidanceProps) {
  return (
    <>
      {contentSections.map(({ title, content, noTitle, noDemo }) => {
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
    </>
  );
}
