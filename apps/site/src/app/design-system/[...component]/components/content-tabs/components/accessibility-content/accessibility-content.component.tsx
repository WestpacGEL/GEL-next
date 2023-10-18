'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container, Grid, Item, Select } from '@westpac/ui';
import { useId, useState } from 'react';

import { Section } from '@/components/content-blocks/section';
import { Link, Text } from '@/components/content-blocks/typography';
import { DOCUMENT_RENDERERS } from '@/components/document-renderer';
import { Heading } from '@/components/document-renderer/components';
import { VisionFilter, VisionFilterProps } from '@/components/vision-filter';

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

  console.log('accessibilitySections', accessibilitySections);

  return (
    <>
      <Section className="border-t-0">
        <Container>
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
          {accessibilityDemo && (
            <>
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
                <DocumentRenderer document={accessibilityDemo} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
              </VisionFilter>
            </>
          )}
        </Container>
      </Section>
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
      {/* 
      
      <Section>
        <Container>
          <Heading>Notes on accessibility</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>
                All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the{' '}
                <Link href="#">four principles of accessibility</Link> &#45; Perceivable, Operable, Understandable and
                Robust. Below are some specific ways in which this component follows these principles:
              </Text>
              <SubHeading>Perceivable</SubHeading>
              <Text>
                The Design System components have been designed to adhere to colour contrast ratios for both text and
                non-text elements. They have been coded to include text alternatives when required, and allow component
                text and labels to be resized. They do not use colour alone to convey information.
              </Text>
              <h4 className="typography-body-10 mb-1 mt-2 font-bold uppercase">Use of colour</h4>
              <Text>
                Alerts use the reserved palette of contextual colours. We do not recommend using the{' '}
                <Link href="#">reserved colours</Link>
                for anything other than alert messaging. Tints used in the alert boxes are designed to maintain
                accessible contrast ratios with the alert text. We do not recommend using other tints of these colours
                as they may fall out of an accessible range.
              </Text>
              <Text>
                Alerts come with a default icon, this allows the meaning of the alert to be perceived without colour.
              </Text>
              <Text>
                Info type alerts can be configured with a custom icon. It&apos;s important that the custom icon is
                relevant to the alert message and not one of the other pre-existing alert icons.
              </Text>
              <Text>Use the Colour impairment demonstration above to see how this component performs.</Text>
              <SubHeading>Operable</SubHeading>
              <Text>
                The Design System components have been coded to be navigable using a keyboard and other assistive
                technologies. WCAG compliance recommends being aware of the time it takes for people to complete tasks
                and to not automatically move focus. Animation should be controlled and simple so as not to cause
                seizures, and it&apos;s important to provide the ability to perform the same task in multiple ways where
                possible. These rules have been followed where navigation and interaction is included in Design System
                components or patterns.
              </Text>
              <SubHeading>Understandable</SubHeading>
              <Text>
                It&apos;s important when crafting messages for alerts that they are understandable to a wide audience,
                particularly as they usually communicate important or critical information. Using the following
                guideline when composing alert copy will ensure they are effective.
              </Text>
              <Text>Alert messages should:</Text>
              <List className="[&_li]:typography-body-9 [&_li]:leading-[2]">
                <List.Item>have context</List.Item>
                <List.Item>exclude jargon</List.Item>
                <List.Item>be succinct</List.Item>
                <List.Item>be direct</List.Item>
                <List.Item>serve a purpose.</List.Item>
              </List>
              <Text>
                Read more about <Link href="#">understanding WCAG reading levels</Link>
              </Text>
              <SubHeading>Robust</SubHeading>
              <Text>
                All Design System components have been coded so they can be clearly announced, understood and navigated
                using all modern assistive technologies.
              </Text>
            </Item>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Accessibility features</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <List className="[&_li]:typography-body-9 [&_li]:leading-[2]">
                <List.Item>
                  A <Code>&lt;span&gt;</Code> element labeled with the specific Alert type represents the Alert icon
                </List.Item>
                <List.Item>
                  A <Code>&lt;button&gt;</Code> element labeled “Close alert” identifies the close button action
                </List.Item>
                <List.Item>
                  &apos;Info&apos; Alerts can be configured with a custom icon. The custom icon must be relevant to the
                  Alert message, sufficiently labeled and not one of the other pre-existing Alert icons.
                </List.Item>
                <List.Item>
                  he Alert shape, text and icon content is visible in Windows High Contrast Mode (WHCM). The Alert type
                  (colour) is not visible in WHCM, however the unique Alert icon provides this information.
                </List.Item>
              </List>
            </Item>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Accessibility features</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>Keyboard users navigate to the close button after the alert content.</Text>
            </Item>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Accessibility API</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <List className="[&_li]:typography-body-9 [&_li]:leading-[2]">
                <List.Item>
                  A <Code>&lt;span aria-label=&quot;&#123;ALERT_LOOK&#125;&quot;&gt;</Code>: Provides a label that
                  describes the Alert icon
                </List.Item>
                <List.Item>
                  A <Code>&lt;role=&quot;img&quot; focusable=&quot;false&quot;&gt;</Code>: Prevents the Alert icon SVG
                  element from being traversed by browsers that map the SVG to the ‘group’ role and from unnecessarily
                  receiving focus in Internet Explorer (IE)
                </List.Item>
                <List.Item>
                  A <Code>&lt;span aria-hidden=&quot;true&quot;&gt;</Code>: Prevents the close button icon from being
                  announced; it is labeled by the parent button
                </List.Item>
              </List>
            </Item>
          </Grid>
        </Container>
      </Section> 
      
    */}
    </>
  );
}
