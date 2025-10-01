'use client';

import { BREAKPOINTS } from '@westpac/style-config/constants';
import { ArrowRightIcon } from '@westpac/ui/icon';
import Image from 'next/image';
import Link from 'next/link';

import { styles as articleStyles } from './article-tile.style';
import { ArticleTileProps } from './article-tile.types';

const SIZES = {
  [BREAKPOINTS.xl]: '50vw, 33vw',
  [BREAKPOINTS.sm]: '100vw',
};

const SIZE_PROP = Object.entries(SIZES)
  .map(([breakpoint, value]) => {
    return `(max-width: ${breakpoint}) ${value}`;
  })
  .join(', ');

export function ArticleTile({ article, slug, className, layout, index }: ArticleTileProps) {
  const styles = articleStyles({ layout, index: index.toString() as '0' | '1' | '2' });
  return (
    <Link href={`/articles/${slug}`} className={styles.base({ className })}>
      {article.thumbnail && (
        <div className={styles.imageWrapper({})}>
          <Image fill sizes={SIZE_PROP} src={article.thumbnail.src} alt={article.name} className="object-cover" />
        </div>
      )}
      <div className={styles.contentWrapper({})}>
        <h4 className={styles.title({})}>{article.cardTitle}</h4>
        <p className={styles.description({})}>{article.smallDescription}</p>
        <ArrowRightIcon className={styles.icon({})} />
      </div>
    </Link>
  );
}
