import { styles as ArticleBodyImageStyles } from './article-body-image.style';
import { type ArticleBodyImageProps } from './article-body-image.types';

export const ArticleBodyImage = ({ articleBodyImage, alt }: ArticleBodyImageProps) => {
  const styles = ArticleBodyImageStyles({});
  return (
    <figure className={styles.base({})}>
      <img className={styles.img({})} loading="lazy" alt={alt} src={articleBodyImage} />
    </figure>
  );
};
