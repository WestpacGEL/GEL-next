import { DocumentRenderer } from '@keystatic/core/renderer';
import { Grid, GridItem } from '@westpac/ui';
import { ArrowRightIcon, CubeIcon, GenericFileIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Container } from '@/app/design-system/components';
import { type BrandKey } from '@/app/types/brand.types';

import { foundationBlocksComponents } from '../component-blocks/foundation-blocks';
import { Section } from '../content-blocks/section';
import { Heading } from '../document-renderer';

import { DOCUMENT_RENDERERS } from './articles-renderer';
import { RelatedInfoProps } from './related-info.types';

export function RelatedInfo({ relatedComponents = [], relatedArticles }: RelatedInfoProps) {
  const relatedComponentsEmpty = relatedComponents?.length < 1;
  const params = useParams();
  const brand = (params.brand ?? 'wbc') as BrandKey;
  return (
    <Section className="bg-background-white">
      <Container className="">
        <Heading
          level={2}
          className={`
            mb-4
            sm:mb-7
          `}
        >
          Related information
        </Heading>
        <Grid>
          {!relatedComponentsEmpty && (
            <GridItem span={{ initial: 12, xsl: 4 }}>
              <h3
                className={`
                  flex items-center justify-between border-b
                  border-border-muted-soft pb-3 typography-body-8 font-bold
                `}
              >
                Components
                <CubeIcon color="muted" />
              </h3>
              <ul>
                {relatedComponents.map(({ title, slug }) => {
                  return (
                    <li key={title}>
                      <Link href={`/design-system/${brand}/${slug}`}>{title}</Link>
                    </li>
                  );
                })}
              </ul>
            </GridItem>
          )}
          {relatedArticles && (
            <GridItem span={12} start={{ initial: 1, xsl: relatedComponentsEmpty ? 1 : 6 }}>
              <h3
                className={`
                  flex items-center justify-between border-b
                  border-border-muted-soft pb-3 typography-body-8 font-bold
                `}
              >
                Articles
                <GenericFileIcon color="muted" />
              </h3>
              <div className="mt-3">
                <DocumentRenderer
                  document={relatedArticles}
                  renderers={DOCUMENT_RENDERERS}
                  componentBlocks={foundationBlocksComponents}
                />
              </div>
            </GridItem>
          )}
        </Grid>
      </Container>
    </Section>
  );
}

function Link({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <NextLink
      className={`
        flex min-h-[3.4375rem] items-center justify-between border-b
        border-border-muted-soft py-1 typography-body-10 hover:text-text-primary
        hover:underline focus-visible:focus-outline
      `}
      {...props}
    >
      {children}
      <ArrowRightIcon color="primary" />
    </NextLink>
  );
}
