'use client';

import { Container, Grid } from '@westpac/ui';

import { ArticleTile } from '../article-tile/article-tile.component';

import { HomePageProps } from './home-page.types';

export const HomePage = ({ articles }: HomePageProps) => {
  const firstOnes = articles.slice(0, 2);
  const restArticles = articles.slice(2);

  return (
    <Container className="mb-8 mt-5 xsl:mt-6 sm:mt-8 md:mt-9 lg:mt-10">
      <Grid>
        {/* 2x6 */}
        {firstOnes.map(article => (
          <div key={article.slug} className="col-span-12 xsl:col-span-6">
            <ArticleTile article={article.entry} slug={article.slug} />
          </div>
        ))}
        {/* 3x4 */}
        {restArticles.map(article => (
          <div key={article.slug} className="col-span-12 xsl:col-span-4">
            <ArticleTile article={article.entry} slug={article.slug} className="xsl:aspect-[708/559]" />
          </div>
        ))}
      </Grid>
    </Container>
  );
};
