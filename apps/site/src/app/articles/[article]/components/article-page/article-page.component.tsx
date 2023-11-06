'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Container, Grid } from '@westpac/ui';

import { DOCUMENT_RENDERERS } from '..';

import { type ArticlePageProps } from './article-page.types';

export function ArticlePage({ article, author }: ArticlePageProps) {
  return (
    <div>
      <div className="bg-gradient-to-b from-white from-25% to-gel-background">
        <Container className=" pt-8 xsl:pt-10 sm:pt-11">
          <Grid className="gap-y-5 xsl:gap-y-6 sm:gap-y-8">
            <div className="col-span-12">
              <h1 className="typography-body-6 mb-2 font-black tracking-[-1px] xsl:typography-body-3 xsl:mb-3">
                {article.name}
              </h1>
              <p className="text-gel-muted">{author?.name}</p>
            </div>
            <div className="col-span-12 mb-7 xsl:mb-9">
              {article.image && (
                <figure>
                  <img alt={article.name} src={article.image} className="block h-auto w-full" />
                </figure>
              )}
            </div>
          </Grid>
        </Container>
      </div>
      <Container>
        <div className="mx-auto w-full pb-9 sm:w-8/12">
          <DocumentRenderer document={article.content} renderers={DOCUMENT_RENDERERS} componentBlocks={{}} />
        </div>
      </Container>
    </div>
  );
}
