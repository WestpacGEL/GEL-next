import Image from 'next/image';

import { styles as imageStyles } from './article-image.style';
import { type ArticleImageProps } from './article-image.types';

export const ArticleImage = ({ image, caption, spacing = 'default' }: ArticleImageProps) => {
  const styles = imageStyles({ spacing });
  return (
    <figure className={styles.base({})}>
      <Image
        className={styles.img({})}
        loading="lazy"
        alt={image.alt}
        src={image.src}
        height={image.height}
        width={image.width}
      />
      {caption && <figcaption className={styles.caption({})}>{caption}</figcaption>}
    </figure>
  );
};
