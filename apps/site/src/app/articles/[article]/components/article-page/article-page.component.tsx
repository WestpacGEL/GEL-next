'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Grid, GridContainer } from '@westpac/ui';
import Image from 'next/image';

import { ArticleComponentBlocksComponents } from '@/components/component-blocks/article-component-blocks';
import { LeadingText } from '@/components/component-blocks/components/leading-text';
import { StickyFooter } from '@/components/sticky-footer';

import { DOCUMENT_RENDERERS } from '..';

import { type ArticlePageProps } from './article-page.types';

export function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <div className="bg-gradient-to-b from-white from-25% to-gel-background">
        <GridContainer className=" pt-8 xsl:pt-10 sm:pt-11">
          <Grid className="gap-y-5 xsl:gap-y-6 sm:gap-y-8">
            <div className="col-span-12">
              <h1 className="typography-site-6 mb-2 font-black !leading-[1.1] tracking-[-1px] xsl:typography-site-3 xsl:mb-3">
                {article.name}
              </h1>
              <p className="typography-site-9 text-gel-muted">{article.author}</p>
            </div>
            <div className="col-span-12 mb-7 xsl:mb-9">
              {article.image && (
                <figure>
                  <Image
                    priority
                    alt={article.image.alt}
                    src={article.image.src}
                    height={article.image.height || undefined}
                    width={article.image.width || undefined}
                    className="block h-auto w-full"
                  />
                </figure>
              )}
            </div>
          </Grid>
        </GridContainer>
      </div>
      <GridContainer className="pb-8 xsl:pb-10 sm:pb-11">
        <Grid className="gap-y-0 xsl:gap-y-0 sm:gap-y-0">
          <LeadingText text={article.description} />
          <DocumentRenderer
            document={article.content}
            renderers={DOCUMENT_RENDERERS}
            componentBlocks={ArticleComponentBlocksComponents}
          />
        </Grid>
      </GridContainer>
      <StickyFooter />
    </>
  );
}
