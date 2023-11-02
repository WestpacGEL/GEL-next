'use client';

import { Container } from '@westpac/ui';

import { ArticleTile } from '../article-tile/article-tile.component';

import { articleWrapperStyles } from './home-page.styles';
import { HomePageProps } from './home-page.types';

export const HomePage = ({ articleRows }: HomePageProps) => {
  return (
    <Container className="mb-8 mt-5 flex flex-col gap-4 px-4 xsl:mt-6 sm:mt-8 md:mt-9 lg:mt-10">
      {articleRows.map(({ articles, layout }, index) => (
        <div key={index} className={articleWrapperStyles({ layout })}>
          {articles.map(({ slug, ...article }, index) => {
            return <ArticleTile layout={layout} index={index} key={slug} slug={slug} article={article} />;
          })}
        </div>
      ))}
    </Container>
  );
};
