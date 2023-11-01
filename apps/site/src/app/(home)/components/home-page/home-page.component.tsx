'use client';

import { Container, Grid } from '@westpac/ui';
import { clsx } from 'clsx';

import { ArticleTile } from '../article-tile/article-tile.component';

import { ArticleColumn } from './components/article-column/article-column.component';
import { HomePageProps } from './home-page.types';

export const HomePage = ({ articleRows }: HomePageProps) => {
  return (
    <Container className="mb-8 mt-5 flex flex-col gap-4 xsl:mt-6 sm:mt-8 md:mt-9 lg:mt-10">
      {articleRows.map(({ articles, layout }, index) => (
        <div key={index} className="flex flex-col gap-4 xsl:flex-row">
          {articles.map(({ slug, ...article }, index) => {
            return <ArticleTile layout={layout} index={index} key={slug} slug={slug} article={article} />;
          })}
        </div>
      ))}
    </Container>
  );
};
