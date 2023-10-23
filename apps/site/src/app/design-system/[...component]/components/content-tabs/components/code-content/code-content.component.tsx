'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Button, Container, Grid, Item } from '@westpac/ui';
import { NewWindowIcon } from '@westpac/ui/icon';

import { ComponentPropsTable } from '@/components/component-props-table';
import { Code } from '@/components/content-blocks/typography';
import { Heading } from '@/components/document-renderer';

import { DOCUMENT_RENDERERS } from '../document-renderer';
import { TableOfContents } from '../intro/components';

import { type CodeContentProps } from '.';

export function CodeContent({ content, westpacUIInfo, componentProps, subComponentProps }: CodeContentProps) {
  return (
    <>
      <section className="py-7 sm:pb-10 sm:pt-15">
        <Container>
          <Grid>
            <Item span={{ initial: 12, sm: 7 }}>
              <table className="table w-full bg-[#f2f8fc] text-info">
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
                        className="pl-0"
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
                  <tr>
                    <th className="w-10 border-y border-gel-icon p-3 text-left font-semibold">Requires</th>
                    <td className="border-y border-gel-icon p-3">react@18</td>
                  </tr>
                </tbody>
              </table>
            </Item>
            <Item span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
              <TableOfContents contents={[{ title: 'test' }]} />
            </Item>
          </Grid>
        </Container>
      </section>
      <Container className="py-15">
        <DocumentRenderer document={content} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
      </Container>
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
                  displayName: `${componentProps.displayName}.${subComponentProps.displayName?.replace(
                    componentProps.displayName || '',
                    '',
                  )}`,
                }}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
