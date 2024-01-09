import { GridItem } from '@westpac/ui/grid';
import Image from 'next/image';

import { styles as ArticleBodyImageStyles } from './article-body-image.style';
import { type ArticleBodyImageProps } from './article-body-image.types';
import { layoutMap } from './article-body-image.utils';

export const ArticleBodyImage = ({ image, title, type = 'body' }: ArticleBodyImageProps) => {
  const styles = ArticleBodyImageStyles({});
  return (
    <GridItem span={layoutMap[type].span} start={layoutMap[type].start}>
      <figure className={styles.base({})}>
        <Image
          className={styles.img({})}
          loading="lazy"
          alt={image.alt}
          src={image.src}
          height={image.height}
          width={image.width}
        />
        {title && <figcaption className={styles.caption({})}>{title}</figcaption>}
      </figure>
    </GridItem>
  );
};
