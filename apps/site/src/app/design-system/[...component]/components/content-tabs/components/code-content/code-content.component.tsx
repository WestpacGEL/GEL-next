'use client';

import { DocumentElement } from '@keystatic/core';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { Button, Grid, Item } from '@westpac/ui';
import { NewWindowIcon } from '@westpac/ui/icon';
import { useMemo } from 'react';

import { Container } from '@/app/design-system/components';
import { ComponentPropsTable } from '@/components/component-props-table';
import { Code } from '@/components/content-blocks/typography';
import { Heading } from '@/components/document-renderer';
import { pascalToKebab } from '@/utils/format-string';

import { DOCUMENT_RENDERERS } from '../document-renderer';
import { TableOfContents } from '../intro/components';

import { type CodeContentProps } from '.';

export function CodeContent({ content = [], westpacUIInfo, componentProps, subComponentProps }: CodeContentProps) {
  const tableOfContents = useMemo(() => {
    return (
      content?.reduce((acc, item: DocumentElement & { level?: number }) => {
        if (item.type === 'heading' && item?.level && item.level <= 3) {
          return [...acc, { title: item.children[0].text as string }];
        }
        return acc;
      }, [] as { title: string }[]) || []
    );
  }, [content]);

  return (
    <>
      <section className="py-7 sm:pb-10 sm:pt-15">
        <Container>
          <Grid>
            <Item span={{ initial: 12, sm: 7 }}>
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
            </Item>
            <Item span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
              <TableOfContents contents={tableOfContents} />
            </Item>
          </Grid>
        </Container>
      </section>
      <section className="border-t border-t-border">
        <Container className="py-15">
          <h2 className="typography-body-6 mb-4 font-bold sm:mb-8">Development examples</h2>
          <DocumentRenderer document={content} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
        </Container>
      </section>
      {componentProps && (
        <section className="bg-white py-7 sm:pb-10 sm:pt-15">
          <Container>
            <Heading level={2}>Props</Heading>
            <div className="flex flex-col gap-6">
              <ComponentPropsTable componentProps={componentProps} />
              {subComponentProps?.map(subComponentProps => (
                <ComponentPropsTable
                  key={subComponentProps.displayName}
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
