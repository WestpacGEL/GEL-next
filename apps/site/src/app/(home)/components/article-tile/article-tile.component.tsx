'use client';

import { ArrowRightIcon } from '@westpac/ui/icon';
import Image from 'next/image';
import Link from 'next/link';

import { styles as articleStyles } from './article-tile.style';
import { ArticleTileProps } from './article-tile.types';

export function ArticleTile({ article, slug, className }: ArticleTileProps) {
  const styles = articleStyles({ className });
  return (
    <Link href={`/articles/${slug}`} className={styles.base({})}>
      {article.thumbnail && (
        <div className={styles.imageWrapper({})}>
          <Image fill objectFit="cover" src={article.thumbnail} alt="" />
        </div>
      )}
      <div className={styles.contentWrapper({})}>
        <h4 className={styles.title({})}>{article.name}</h4>
        <p className={styles.description({})}>{article.description}</p>
        <ArrowRightIcon className={styles.icon({})} />
      </div>
    </Link>
  );
}
