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
      <div className="to-gel-background bg-gradient-to-b from-white from-25%">
        <GridContainer fixed className=" xsl:pt-10 lg:max-w-gel-lg-container pt-8 sm:pt-11 lg:px-10">
          <Grid className="xsl:gap-y-6 gap-y-5 sm:gap-y-8">
            <div className="col-span-12">
              <h1 className="typography-site-6 xsl:typography-site-3 xsl:mb-3 mb-2 !leading-[1.1] font-black tracking-[-1px]">
                {article.name}
              </h1>
              <p className="typography-site-9 text-gel-muted">{article.author}</p>
            </div>
            <div className="xsl:mb-9 col-span-12 mb-7">
              {article.image && (
                <figure>
                  <Image
                    priority
                    alt={article.image.alt.trim()}
                    src={article.image.src.trim()}
                    height={article.image.height || 600}
                    width={article.image.width || 1000}
                    className="block h-auto w-full"
                  />
                </figure>
              )}
            </div>
          </Grid>
        </GridContainer>
      </div>
      <GridContainer fixed className="xsl:pb-10 lg:max-w-gel-lg-container pb-8 sm:pb-11 lg:px-10">
        <Grid className="xsl:gap-y-0 gap-y-0 sm:gap-y-0">
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
