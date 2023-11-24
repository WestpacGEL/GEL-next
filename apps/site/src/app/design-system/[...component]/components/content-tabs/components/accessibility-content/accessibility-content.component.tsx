'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container, Grid, Item, Select } from '@westpac/ui';
import { useId, useState } from 'react';

import { Section } from '@/components/content-blocks/section';
import { Link, Text } from '@/components/content-blocks/typography';
import { Code, Heading } from '@/components/document-renderer';
import { VisionFilter, VisionFilterProps } from '@/components/vision-filter';

import { DOCUMENT_RENDERERS } from '../document-renderer';

import { AccessibilityContentProps } from '.';

const FILTERS = [
  { text: 'No filter', value: '' },
  { text: 'Achromatomaly', value: 'achromatomaly' },
  { text: 'Achromatopsia', value: 'achromatopsia' },
  { text: 'Deuteranomaly', value: 'deuteranomaly' },
  { text: 'Deuteranopia', value: 'deuteranopia' },
  { text: 'Protanomaly', value: 'protanomaly' },
  { text: 'Protanopia', value: 'protanopia' },
  { text: 'Tritanomaly', value: 'tritanomaly' },
  { text: 'Tritanopia', value: 'tritanopia' },
  { text: 'Low contrast', value: 'low-contrast' },
] as const;

export function AccessibilityContent({ accessibilitySections, accessibilityDemo }: AccessibilityContentProps) {
  const [filter, setFilter] = useState<VisionFilterProps['value']>();
  const id = useId();

  console.log('accessibilityDemo', accessibilityDemo);

  return (
    <>
      {accessibilityDemo && (
        <Section className="border-t-0">
          <Container className="pt-5">
            <Heading level={2} className="mb-4 sm:mb-7">
              Colour impairment demonstration
            </Heading>
            <Grid>
              <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
                <Text>
                  All components are designed and tested to ensure colour contrast ratios comply with the WCAG 2.1 AA
                  specification. Select a filter from the list below to see how this component would appear to someone
                  with a: <Link href="#">colour vision impairment</Link>.
                </Text>
              </Item>
            </Grid>
            <div className="mb-4 flex items-center bg-light p-4">
              <label htmlFor={id} className="mr-[1rem]">
                Select filter
              </label>
              <Select
                id={id}
                value={filter}
                onChange={event => setFilter(event.target.value as VisionFilterProps['value'])}
              >
                {FILTERS.map(filter => (
                  <option key={filter.text} value={filter.value}>
                    {filter.text}
                  </option>
                ))}
              </Select>
            </div>
            <VisionFilter value={filter}>
              <DocumentRenderer
                document={accessibilityDemo}
                renderers={{
                  ...DOCUMENT_RENDERERS,
                  block: {
                    ...DOCUMENT_RENDERERS.block,
                    code: props => <Code className="my-4" enableLiveCode={false} {...props} />,
                  },
                }}
                componentBlocks={{}}
              />
            </VisionFilter>
          </Container>
        </Section>
      )}
      {accessibilitySections?.map(({ title, content }) => {
        const id = title.toLowerCase().split(' ').join('-');
        return (
          <Section key={id} className="">
            <Container>
              <Heading level={2}>{title}</Heading>
              <DocumentRenderer document={content} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
            </Container>
          </Section>
        );
      })}
    </>
  );
}
