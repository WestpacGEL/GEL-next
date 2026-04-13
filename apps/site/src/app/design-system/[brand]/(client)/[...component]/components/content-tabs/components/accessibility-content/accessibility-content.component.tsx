'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';

import { Container } from '@/app/design-system/components';
import { AccessibilityDemo } from '@/components/component-blocks/components/accessibility-demo';
import { ShortCode } from '@/components/component-blocks/components/short-code';
import { foundationBlocksComponents } from '@/components/component-blocks/foundation-blocks';
import { Section } from '@/components/content-blocks/section';
import { Heading } from '@/components/document-renderer';

import { DOCUMENT_RENDERERS } from '../document-renderer';

import { AccessibilityContentProps } from '.';

export function AccessibilityContent({
  accessibilitySections,
  accessibilityDemo,
  shortCodes,
}: AccessibilityContentProps) {
  return (
    <>
      {accessibilitySections?.map(({ title, content }) => {
        const id = title.toLowerCase().split(' ').join('-');
        return (
          <Section key={id} className="">
            <Container>
              <Heading level={2}>{title}</Heading>
              <DocumentRenderer
                document={content}
                renderers={DOCUMENT_RENDERERS}
                componentBlocks={{
                  ...foundationBlocksComponents,
                  accessibilityDemo: () => <AccessibilityDemo content={accessibilityDemo || []} />,
                  shortCode: props => {
                    return (
                      <div className="mb-4">
                        <ShortCode shortCodes={shortCodes} {...props} />
                      </div>
                    );
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
