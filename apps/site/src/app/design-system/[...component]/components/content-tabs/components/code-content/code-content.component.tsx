'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Button, Grid, GridItem } from '@westpac/ui';
import { NewWindowIcon } from '@westpac/ui/icon';
import { useMemo } from 'react';

import { Container } from '@/app/design-system/components';
import { Colors } from '@/components/component-blocks/colors/colors.component';
import { ShortCode } from '@/components/component-blocks/components/short-code';
import { ComponentPropsTable } from '@/components/component-props-table';
import { Section } from '@/components/content-blocks/section';
import { Code } from '@/components/content-blocks/typography';
import { Heading } from '@/components/document-renderer';
import { pascalToKebab } from '@/utils/format-string';

import { DOCUMENT_RENDERERS } from '../document-renderer';
import { TableOfContents } from '../intro/components';

import { type CodeContentProps } from '.';

export function CodeContent({
  codeSections = [],
  westpacUIInfo,
  componentProps,
  subComponentProps,
  componentName,
  description,
  shortCodes,
}: CodeContentProps) {
  const sectionNames = useMemo(() => {
    const sections = codeSections?.filter(({ noTitle }) => !noTitle).map(({ title }) => ({ title }));
    if (sections.length > 0) {
      return componentProps ? [...sections, { title: 'Props' }] : [...sections];
    }
    return [];
  }, [codeSections, componentProps]);

  return (
    <>
      <section className="py-7 sm:pb-10 sm:pt-15">
        <Container>
          <Grid className="gap-y-5.5">
            <GridItem span={{ initial: 12, sm: 7 }}>
              {description && (
                <p className="typography-body-8 mb-7 font-light leading-[1.5] sm:typography-body-7 sm:leading-[1.5]">
                  {description}
                </p>
              )}
              <table className="typography-body-11 table w-full bg-[#f2f8fc] text-info">
                <tbody>
                  <tr>
                    <th className="w-10 border-y border-gel-icon p-3 text-left font-semibold">Version</th>
                    <td className="border-y border-gel-icon p-3">{westpacUIInfo?.currentVersion}</td>
                  </tr>
                  <tr>
                    <th className="w-10 border-y border-gel-icon p-3 text-left font-semibold">History</th>
                    <td className="border-y border-gel-icon p-3">
                      <Button
                        tag="a"
                        size="small"
                        className="p-0 leading-none"
                        look="link"
                        target="_blank"
                        href={westpacUIInfo?.changelog || '#'}
                      >
                        <div className="flex items-center gap-1">
                          <span>View changes</span>
                          <NewWindowIcon size="xsmall" />
                        </div>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-10 border-y border-gel-icon p-3 text-left font-semibold">Install</th>
                    <td className="border-y border-gel-icon p-3 text-black">
                      <Code>npm install @westpac/ui</Code>
                    </td>
                  </tr>
                  {componentProps && (
                    <tr>
                      <th className="w-10 border-y border-gel-icon p-3 text-left font-semibold">Usage</th>
                      <td className="border-y border-gel-icon p-3 text-black">
                        <Code>{`import { ... } from @westpac/ui/${pascalToKebab(componentProps.displayName)}`}</Code>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </GridItem>
            {sectionNames.length > 0 && (
              <GridItem span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
                <TableOfContents contents={sectionNames} />
              </GridItem>
            )}
          </Grid>
        </Container>
      </section>
      {codeSections?.map(({ title, content, noTitle }) => {
        const id = title.toLowerCase().split(' ').join('-');
        return (
          <Section key={id}>
            <Container>
              {!noTitle && <Heading level={2}>{title}</Heading>}
              <DocumentRenderer
                document={content}
                renderers={DOCUMENT_RENDERERS}
                componentBlocks={{
                  colors: props => <Colors palette={props.palette} tab="code" />,
                  shortCode: props => {
                    return <ShortCode shortCodes={shortCodes} {...props} />;
                  },
                }}
              />
            </Container>
          </Section>
        );
      })}
      {componentProps && (
        <section className="border-t border-t-border bg-white py-7 sm:pb-10 sm:pt-15">
          <Container>
            <Heading level={2} className="!mb-4 sm:!mb-7">
              Props
            </Heading>
            <div className="flex flex-col gap-6">
              <ComponentPropsTable caption={componentName} componentProps={componentProps} />
              {subComponentProps?.map(subComponentProps => (
                <ComponentPropsTable
                  key={subComponentProps.displayName}
                  caption={subComponentProps.displayName}
                  componentProps={{
                    ...subComponentProps,
                    displayName: subComponentProps.displayName,
                  }}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
