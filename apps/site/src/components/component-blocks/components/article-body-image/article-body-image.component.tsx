import { Item } from '@westpac/ui/grid';

import { styles as ArticleBodyImageStyles } from './article-body-image.style';
import { type ArticleBodyImageProps } from './article-body-image.types';
import { layoutMap } from './article-body-image.utils';

export const ArticleBodyImage = ({ articleBodyImage, alt, title, type = 'body' }: ArticleBodyImageProps) => {
  const styles = ArticleBodyImageStyles({});
  return (
    <Item span={layoutMap[type].span} start={layoutMap[type].start}>
      <figure className={styles.base({})}>
        <img className={styles.img({})} loading="lazy" alt={alt} src={articleBodyImage} />
        {title && <figcaption className={styles.caption({})}>{title}</figcaption>}
      </figure>
    </Item>
  );
};
