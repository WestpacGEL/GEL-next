'use client';

import { ArrowRightIcon } from '@westpac/ui/icon';
import Image from 'next/image';
import Link from 'next/link';

import { styles as articleStyles } from './article-tile.style';
import { ArticleTileProps } from './article-tile.types';

export function ArticleTile({ article, slug, className, layout, index }: ArticleTileProps) {
  const styles = articleStyles({ layout, index: index.toString() as '0' | '1' | '2' });
  return (
    <Link href={`/articles/${slug}`} className={styles.base({ className })}>
      {article.thumbnail && (
        <div className={styles.imageWrapper({})}>
          <Image fill objectFit="cover" src={article.thumbnail} alt="" />
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
